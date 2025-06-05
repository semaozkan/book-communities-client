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
  console.log("dışarda user", loggedInUser.user);

  const navigate = useNavigate();
  const { communityId } = useParams();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [isSendRequest, setIsSendRequest] = useState(false);
  const [activeMeeting, setActiveMeeting] = useState(false);

  const [community, setCommunity] = useState({});
  const [communityPosts, setCommunityPosts] = useState([]);

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

  const [activeTab, setActiveTab] = useState("posts");

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
          (pendingMember) => pendingMember._id === loggedInUser.user._id
        );

        const activeMeeting = res.data.activeMeeting;
        const activePosts = res.data.posts.filter((p) => p.isActive);

        setIsSendRequest(isSendRequest);
        setIsMember(isMember);
        setIsAdmin(isAdmin);
        setCommunity(res.data);
        setActiveMeeting(activeMeeting);
        setCommunityPosts(activePosts);
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

      setCommunityPosts((prevPosts) => [res.data, ...(prevPosts || [])]);

      setIsPostModalOpen(false);
      setPostContent("");
      setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStartMeeting = async () => {
    try {
      const res = await axios.post(
        `${FETCH}meetings/start`,
        {
          communityId: communityId,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        navigate(`/meet/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigateToMeet = async () => {
    try {
      const res = await axios.post(
        `${FETCH}meetings/${activeMeeting}/join`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate(`/meet/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Accept request
  const handleAcceptRequest = async (userId) => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/accept`,
        { userId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setCommunity((prev) => ({
          ...prev,
          pendingMembers: prev.pendingMembers.filter(
            (member) => member._id !== userId
          ),
          members: [
            ...prev.members,
            prev.pendingMembers.find((member) => member._id === userId),
          ],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(community);

  // Reject request
  const handleRejectRequest = async (userId) => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/reject-request`,
        { userId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setCommunity((prev) => ({
          ...prev,
          pendingMembers: prev.pendingMembers.filter(
            (member) => member._id !== userId
          ),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateBg = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${FETCH}image-uploader/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { url } = response.data;
        const res = await axios.put(
          `${FETCH}communities/${communityId}/images`,
          {
            coverImage: url,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setBackgroundImage(url);
          console.log("Arkaplan fotoğrafı güncellendi:", response.data);
          const updatedCommunity = res.data;
          setCommunity(updatedCommunity);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.communityContainer}>
      <div className={styles.firstSection}>
        <div className={styles.imgContainer}>
          <img src={community.coverImage} alt="" />
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
                onChange={handleUpdateBg}
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
                <div
                  className={styles.messageButton}
                  style={{ display: "none" }}
                >
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
                      Topluluğa Katıl
                    </button>
                  )}
                </div>
              </>
            )}

            {activeMeeting && isMember && (
              <div className={styles.joinMeetButtonContainer}>
                <button
                  className={styles.joinMeetButton}
                  onClick={handleNavigateToMeet}
                >
                  Toplantıya Katıl
                </button>
              </div>
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
                  <button onClick={handleStartMeeting}>Toplantı Başlat</button>
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
          {isAdmin ? (
            <>
              {/* Tab bar */}
              <div
                className={styles.tabBar}
                style={{
                  display: "flex",
                  gap: 0,
                  marginBottom: 36,
                  marginTop: 42,
                }}
              >
                <button
                  className={activeTab === "posts" ? styles.activeTab : ""}
                  onClick={() => setActiveTab("posts")}
                >
                  Gönderiler
                </button>
                <button
                  className={activeTab === "requests" ? styles.activeTab : ""}
                  onClick={() => setActiveTab("requests")}
                >
                  İstekler
                </button>
              </div>

              {/* Tab content */}
              {activeTab === "posts" && (
                <>
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
                  {communityPosts && communityPosts.length > 0 ? (
                    <div className={styles.postCards}>
                      {communityPosts?.map((post) => (
                        <CommunityPostCard
                          key={post._id}
                          community={community}
                          setCommunity={setCommunity}
                          setCommunityPosts={setCommunityPosts}
                          post={post}
                          isAdmin={isAdmin}
                          isMember={isMember}
                          user={loggedInUser}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className={styles.noEvent}>
                      Henüz Etkinlik Paylaşılmadı
                    </div>
                  )}
                </>
              )}
              {activeTab === "requests" && (
                <div className={styles.requestsTab}>
                  {community.pendingMembers &&
                  community.pendingMembers.length > 0 ? (
                    <ul style={{ padding: 0, listStyle: "none", margin: 0 }}>
                      {community.pendingMembers.map((member) => (
                        <li key={member._id} className={styles.requestCard}>
                          <div
                            className={styles.requestUserInfo}
                            onClick={() => navigate(`/profile/${member._id}`)}
                            style={{
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 14,
                            }}
                          >
                            <img
                              src={
                                member.profilePicture ||
                                "/images/profile_photo.jpg"
                              }
                              alt={member.fullname}
                              className={styles.requestProfileImg}
                            />
                            <div>
                              <div className={styles.requestFullname}>
                                {member.fullname}
                              </div>
                              <div className={styles.requestUsername}>
                                @{member.username}
                              </div>
                            </div>
                          </div>
                          <div className={styles.requestActions}>
                            <button
                              onClick={() => handleAcceptRequest(member._id)}
                              className={styles.acceptBtn}
                            >
                              Kabul Et
                            </button>
                            <button
                              onClick={() => handleRejectRequest(member._id)}
                              className={styles.rejectBtn}
                            >
                              Reddet
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className={styles.noRequest}>
                      Aktif bir katılım isteği yoktur.
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Sadece gönderiler, tab bar yok */}
              {communityPosts && communityPosts.length > 0 ? (
                <div className={styles.postCards}>
                  {communityPosts?.map((post) => (
                    <CommunityPostCard
                      key={post._id}
                      community={community}
                      setCommunity={setCommunity}
                      setCommunityPosts={setCommunityPosts}
                      post={post}
                      isAdmin={isAdmin}
                      isMember={isMember}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.noEvent}>
                  Henüz Etkinlik Paylaşılmadı
                </div>
              )}
            </>
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
                communityId={communityId}
                setCommunity={setCommunity}
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
