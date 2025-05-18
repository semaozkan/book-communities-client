import styles from "./communityMember.module.scss";
import { IoIosSend } from "react-icons/io";
import { FaUserMinus } from "react-icons/fa";
import { useState } from "react";

const CommunityMember = ({
  customStyle,
  onRemoveClick,
  onMessageClick,
  userRole,
}) => {
  const isAdmin = userRole === "admin";
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.communityMember}>
      <div className={customStyle}>
        <div className={styles.memberContainer}>
          <div className={styles.imgContainer}>
            <img src="/images/profile_photo.jpg" alt="" />
          </div>
          <div className={styles.memberInfo}>
            <div className={styles.name}>Semanur Özkan</div>
            <div className={styles.role}>PaüSiber Kitap Topluluğu Üyesi</div>

            <div className={styles.buttonGroup}>
              <button onClick={onMessageClick} className={styles.messageButton}>
                <IoIosSend className={styles.sendIcon} />
                Mesaj
              </button>

              {isAdmin && (
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className={styles.removeButton}
                >
                  <FaUserMinus className={styles.removeIcon} />
                  Topluluktan Çıkar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Topluluktan Çıkar</div>
            <div className={styles.modalText}>
              Bu üyeyi topluluktan çıkarmak istediğinize emin misiniz?
            </div>
            <div className={styles.modalActions}>
              <button className={styles.confirmButton}>Evet, Çıkar</button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className={styles.cancelButton}
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityMember;
