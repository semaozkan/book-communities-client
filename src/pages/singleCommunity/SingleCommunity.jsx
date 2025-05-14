import CommunityMember from "../../components/communityMember/CommunityMember";
import CommunityPostCard from "../../components/CommunityPostCard/CommunityPostCard";
import styles from "./singleCommunity.module.scss";
import { MdCameraAlt } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { LuPlus } from "react-icons/lu";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import MessageModal from "../../components/MessageModal/MessageModal";

const SingleCommunity = ({ userRole = "guest" }) => {
  const isGuest = userRole === "guest";

  const isMember = userRole === "member" || userRole === "admin";

  const isAdmin = userRole === "admin";

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const [postText, setPostText] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const [messageModalOpen, setMessageModalOpen] = useState(false);

  return (
    <div className={styles.communityContainer}>
      <div className={styles.firstSection}>
        <div className={styles.imgContainer}>
          <img src="/images/background_image.png" alt="" />
          <div className={styles.communityProfilePhoto}>
            <img src="/images/pausiber_kitap_topluluğu.png" alt="" />
          </div>
          {isAdmin && (
            <div className={styles.photoDrapdown}>
              <MdCameraAlt className={styles.cameraIcon} />
            </div>
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>PaüSiber Kitap Topluluğu</div>
          <div className={styles.dec}>
            Pamukkale Üniversitesi öğrencileri tarafından oluşturulmuş bir
            topluluk
          </div>
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
                  <button>Katıl</button>
                </div>
              </>
            )}

            {isAdmin && (
              <div className={styles.editCommunityInfo}>
                <MdOutlineEdit className={styles.editIcon} />
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
            <CommunityPostCard />
            <CommunityPostCard />
            <CommunityPostCard />
          </div>
        </div>
        <div className={styles.memberContainer}>
          <div className={styles.header}>Üyeler</div>
          <div className={styles.members}>
            <CommunityMember customStyle={styles.singleMember} />
            <CommunityMember customStyle={styles.singleMember} />
            <CommunityMember />
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
