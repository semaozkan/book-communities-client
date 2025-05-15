import styles from "./notificationCard.module.scss";
import { IoIosClose } from "react-icons/io";

const NotificationCard = () => {
  return (
    <div className={styles.notificationCard}>
      <div className={styles.notificationContent}>
        <div className={styles.senderImage}>
          <img src="../../../public/images/profile_photo.jpg" alt="" />
        </div>
        <div className={styles.messageContent}>
          <p>
            <strong>Semanur Özkan size mesaj göndermek istiyor : </strong>
            "Merhaba, geçen hafta okuduğun kitabı çok merak ettim. Önerir
            misin?"
          </p>
        </div>
      </div>

      <div className={styles.cardEnd}>
        <div className={styles.time}>2 saat</div>
        <div>
          <IoIosClose className={styles.deleteButton} />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
