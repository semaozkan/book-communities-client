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

const SingleCommunity = ({ userRole = "admin" }) => {
  const isGuest = userRole === "guest";

  const isMember = userRole === "member" || userRole === "admin";

  const isAdmin = userRole === "admin";

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [postText, setPostText] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const navigate = useNavigate();
  const { communityId } = useParams();

  const [isCommunityEditOpen, setIsCommunityEditOpen] = useState(false);

  const [communityName, setCommunityName] = useState(
    "PaüSiber Kitap Topluluğu"
  );
  const [communityDescription, setCommunityDescription] = useState(
    "Pamukkale Üniversitesi öğrencileri tarafından oluşturulmuş bir topluluk"
  );

  // Modal için geçici düzenleme alanları
  const [editedName, setEditedName] = useState(communityName);
  const [editedDescription, setEditedDescription] =
    useState(communityDescription);

  const [backgroundImage, setBackgroundImage] = useState(
    "/images/background_image.png"
  );
  const backgroundInputRef = useRef(null);

  const [joinRequested, setJoinRequested] = useState(false);

  return (
    <div className={styles.communityContainer}>
      <div className={styles.firstSection}>
        <div className={styles.imgContainer}>
          <img src={backgroundImage} alt="" />
          <div className={styles.communityProfilePhoto}>
            <img src="/images/pausiber_kitap_topluluğu.png" alt="" />
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
          <div className={styles.title}>{communityName}</div>
          <div className={styles.dec}>{communityDescription}</div>
          <div className={styles.buttonContainer}>
            {isGuest && (
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
                  <button
                    onClick={() => setJoinRequested((prev) => !prev)}
                    className={`${styles.button} ${
                      joinRequested ? styles.requested : ""
                    }`}
                  >
                    {joinRequested ? "İsteği Gönderildi" : "Katıl"}
                  </button>
                </div>
              </>
            )}

            {isAdmin && (
              <div className={styles.adminButtons}>
                <div
                  className={styles.editCommunityInfo}
                  onClick={() => {
                    setEditedName(communityName);
                    setEditedDescription(communityDescription);
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

          {/* <div className={styles.noEvent}>Henüz etkinlik paylaşılmadı</div> */}
          <div className={styles.postCards}>
            <CommunityPostCard
              post={{
                id: 1,
                content: "Bugün bu kitapları okuyacağız!",
                image: "/images/postImage.jpg",
              }}
              userRole="admin"
              onEdit={(id, newContent) => {
                // Backend'den gelen response sonrası local state güncellemesi yapılabilir
                console.log("Post güncellendi:", id, newContent);
              }}
              onDelete={(id) => {
                // Post silindikten sonra listeden kaldır
                console.log("Post silindi:", id);
              }}
            />
            <CommunityPostCard
              post={{
                id: 1,
                content: "Bugün bu kitapları okuyacağız!",
                image: "/images/postImage.jpg",
              }}
              userRole="admin"
              onEdit={(id, newContent) => {
                // Backend'den gelen response sonrası local state güncellemesi yapılabilir
                console.log("Post güncellendi:", id, newContent);
              }}
              onDelete={(id) => {
                // Post silindikten sonra listeden kaldır
                console.log("Post silindi:", id);
              }}
            />
            <CommunityPostCard
              post={{
                id: 1,
                content: "Bugün bu kitapları okuyacağız!",
                image: "/images/postImage.jpg",
              }}
              userRole="admin"
              onEdit={(id, newContent) => {
                // Backend'den gelen response sonrası local state güncellemesi yapılabilir
                console.log("Post güncellendi:", id, newContent);
              }}
              onDelete={(id) => {
                // Post silindikten sonra listeden kaldır
                console.log("Post silindi:", id);
              }}
            />
          </div>
        </div>
        <div className={styles.memberContainer}>
          <div className={styles.header}>Üyeler</div>
          <div className={styles.members}>
            <CommunityMember
              customStyle={styles.singleMember}
              onMessageClick={() => setMessageModalOpen(true)}
            />
            <CommunityMember
              customStyle={styles.singleMember}
              onMessageClick={() => setMessageModalOpen(true)}
            />
            <CommunityMember onMessageClick={() => setMessageModalOpen(true)} />
          </div>
        </div>
      </div>

      {isPostModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modelContent}>
            <div className={styles.header}>
              <div className={styles.left}>
                <div className={styles.image}>
                  <img src="/images/pausiber_kitap_topluluğu.png" alt="" />
                </div>
                <span>PaüSiber Kitap Topluluğu</span>
              </div>

              <div
                onClick={() => {
                  setIsPostModalOpen(false);
                  setPostText("");
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
                onChange={(e) => setPostText(e.target.value)}
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
                    postText.trim() ? styles.active : styles.disabled
                  }`}
                  disabled={!postText.trim()}
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
                onClick={() => {
                  setCommunityName(editedName);
                  setCommunityDescription(editedDescription);
                  setIsCommunityEditOpen(false);
                }}
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
