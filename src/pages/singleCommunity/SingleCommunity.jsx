import CommunityMember from "../../components/communityMember/CommunityMember";
import CommunityPostCard from "../../components/CommunityPostCard/CommunityPostCard";
import styles from "./singleCommunity.module.scss";
import { MdCameraAlt } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import MessageModal from "../../components/MessageModal/MessageModal";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const SingleCommunity = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user: loggedInUser } = useAuth();

  const navigate = useNavigate();
  const { communityId } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isSendRequest, setIsSendRequest] = useState(false);

  const [community, setCommunity] = useState({});

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [isCommunityEditOpen, setIsCommunityEditOpen] = useState(false);

  // Modal için geçici düzenleme alanları
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const [backgroundImage, setBackgroundImage] = useState(
    "/images/background_image.png"
  );
  const backgroundInputRef = useRef(null);

  useEffect(() => {
    const getCommunity = async () => {
      try {
        const res = await axios.get(`${FETCH}communities/${communityId}`, {
          withCredentials: true,
        });

        const isAdmin = loggedInUser.user._id === res.data.admin._id;

        const isMember = res.data.members.some(
          (member) => member._id === loggedInUser.user._id
        );

        const isSendRequest = res.data.pendingMembers.some(
          (pendingMember) => pendingMember === loggedInUser.user._id
        );

        setIsSendRequest(isSendRequest);
        setIsMember(isMember);
        setIsAdmin(isAdmin);
        setCommunity(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCommunity();
  }, [communityId]);

  const handleUpdateCommunity = async () => {
    try {
      const updateCommunity = {
        name: editedName,
        description: editedDescription,
      };

      const res = await axios.put(
        `${FETCH}communities/${communityId}`,
        updateCommunity,
        { withCredentials: true }
      );

      setCommunity((prev) => ({
        ...prev,
        name: res.data.name,
        description: res.data.description,
      }));

      setIsCommunityEditOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinRequest = async () => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/join`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsSendRequest(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveRequest = async () => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/remove-request`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsSendRequest(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveCommunity = async () => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/leave`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsMember(false);
        setCommunity((prev) => ({
          ...prev,
          members: prev.members.filter(
            (member) => member._id !== loggedInUser.user._id
          ),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async () => {
    try {
      const postData = {
        content: postContent,
        image: selectedImage,
      };
      const res = await axios.post(
        `${FETCH}communities/${communityId}/posts`,
        postData,
        {
          withCredentials: true,
        }
      );

      setCommunity((prev) => ({
        ...prev,
        posts: [res.data, ...(prev.posts || [])],
      }));

      setIsPostModalOpen(false);
      setPostContent("");
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(community);

  console.log("communitymember:", community.members);

  console.log(isAdmin);

  console.log("currentUser:", currentUser);

  console.log("isSendReq:", isSendRequest);
  return (
    <div className={styles.communityContainer}>
      <div className={styles.firstSection}>
        <div className={styles.imgContainer}>
          <img src={backgroundImage} alt="" />
          <div className={styles.communityProfilePhoto}>
            <img src={community.profileImage} alt="profile_image" />
          </div>
          {isAdmin && (
            <div
              className={styles.photoDrapdown}
              onClick={() => backgroundInputRef.current.click()}
            >
              <MdCameraAlt className={styles.cameraIcon} />

              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={backgroundInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setBackgroundImage(imageUrl);
                  }
                }}
              />
            </div>
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>{community.name}</div>
          <div className={styles.dec}>{community.description}</div>
          <div className={styles.buttonContainer}>
            {!isMember && !isAdmin && (
              <>
                <div className={styles.messageButton}>
                  <button
                    onClick={() => {
                      setMessageModalOpen(true);
                    }}
                  >
                    Mesaj Gönder
                  </button>
                </div>

                <div className={styles.joinButton}>
                  {isSendRequest ? (
                    <button
                      onClick={handleRemoveRequest}
                      className={`${styles.button} ${styles.requested}`}
                    >
                      İstek Gönderildi
                    </button>
                  ) : (
                    <button
                      onClick={handleJoinRequest}
                      className={styles.button}
                    >
                      Katıl
                    </button>
                  )}
                </div>
              </>
            )}

            {isAdmin && (
              <div className={styles.adminButtons}>
                <div
                  className={styles.editCommunityInfo}
                  onClick={() => {
                    setEditedName(community.name || "");
                    setEditedDescription(community.description || "");
                    setIsCommunityEditOpen(true);
                  }}
                >
                  <MdOutlineEdit className={styles.editIcon} />
                </div>

                <div className={styles.meetButton}>
                  <button onClick={() => navigate(`/meet/${communityId}`)}>
                    Toplantı Başlat
                  </button>
                </div>
              </div>
            )}

            {isMember && !isAdmin && (
              <div className={styles.memberButtons}>
                <button
                  onClick={handleLeaveCommunity}
                  className={styles.leaveCommunity}
                >
                  Topluluktan Ayrıl
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.eventContainer}>
          <div className={styles.header}>Tüm Gönderiler</div>
          {isAdmin && (
            <div className={styles.newPost}>
              <LuPlus className={styles.plusIcon} />
              <div
                onClick={() => {
                  setIsPostModalOpen(true);
                }}
              >
                Gönderi Oluşturun
              </div>
            </div>
          )}

          {community.posts ? (
            <div className={styles.postCards}>
              {community.posts?.map((post) => (
                <CommunityPostCard
                  key={post._id}
                  community={community}
                  setCommunity={setCommunity}
                  post={post}
                  isAdmin={isAdmin}
                  isMember={isMember}
                />
              ))}
            </div>
          ) : (
            <div className={styles.noEvent}>Henüz etkinlik paylaşılmadı</div>
          )}
        </div>
        <div className={styles.memberContainer}>
          <div className={styles.header}>Üyeler</div>
          <div className={styles.members}>
            {community?.members?.map((member, index) => (
              <CommunityMember
                key={member._id}
                customStyle={
                  index !== community.members.length - 1
                    ? styles.singleMember
                    : ""
                }
                onMessageClick={() => setMessageModalOpen(true)}
                isAdmin={community.admin._id === loggedInUser.user._id}
                member={member}
                setMessages={setMessages}
                setCurrentUser={setCurrentUser}
                adminId={community.admin._id}
              />
            ))}
          </div>
        </div>
      </div>

      {isPostModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modelContent}>
            <div className={styles.header}>
              <div className={styles.left}>
                <div className={styles.image}>
                  <img src={community.profileImage} alt="" />
                </div>
                <span>{community.name}</span>
              </div>

              <div
                onClick={() => {
                  setIsPostModalOpen(false);
                  setPostContent("");
                  setSelectedImage(null);
                }}
                className={styles.right}
              >
                <IoClose className={styles.closeIcon} />
              </div>
            </div>

            {selectedImage && (
              <div className={styles.previewImageContainer}>
                <img src={selectedImage} alt="" />
              </div>
            )}

            <div className={styles.textContent}>
              <textarea
                name="text"
                id="text"
                placeholder="Ne paylaşmak istersiniz?"
                minLength={0}
                maxLength={3000}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.buttonContainer}>
              <div className={styles.addPicture}>
                <div className={styles.imgContainer}>
                  <AiFillPicture className={styles.pictureIcon} />
                </div>
                <button onClick={() => fileInputRef.current.click()}>
                  {" "}
                  Fotoğraf ekle
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageURL = URL.createObjectURL(file);
                      setSelectedImage(imageURL);
                    }
                  }}
                />
              </div>

              <div className={styles.shareButton}>
                <button
                  className={` ${
                    postContent.trim() ? styles.active : styles.disabled
                  }`}
                  disabled={!postContent.trim()}
                  onClick={handleCreatePost}
                >
                  Paylaş
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.messageModal}>
        {messageModalOpen && (
          <MessageModal
            onClose={() => {
              setMessageModalOpen(false);
            }}
            messages={messages}
            setMessages={setMessages}
            selectedUser={currentUser}
            currentUser={loggedInUser.user}
          />
        )}
      </div>

      {isCommunityEditOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsCommunityEditOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Topluluğu Düzenle</h3>
              <IoClose
                className={styles.close}
                onClick={() => setIsCommunityEditOpen(false)}
              />
            </div>

            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className={styles.input}
              placeholder="Topluluk Adı"
            />

            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className={styles.textarea}
              placeholder="Topluluk açıklaması"
            />

            <div className={styles.modalActions}>
              <button
                className={styles.saveButton}
                onClick={handleUpdateCommunity}
              >
                Kaydet
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => setIsCommunityEditOpen(false)}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleCommunity;
