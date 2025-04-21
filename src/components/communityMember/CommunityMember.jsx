import styles from "./communityMember.module.scss";
import { IoIosSend } from "react-icons/io";

const CommunityMember = ({ customStyle }) => {
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
            <div className={styles.messageButton}>
              <button>
                <IoIosSend className={styles.sendIcon} />
                Mesaj
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMember;
