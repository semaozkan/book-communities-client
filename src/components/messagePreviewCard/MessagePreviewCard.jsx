import { useState } from "react";
import styles from "./messagePreviewCard.module.scss";

const MessagePreviewCard = ({ isActive, onClick }) => {
  return (
    <div
      className={`${styles.messagePreviewCard} ${
        isActive ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.imageContainer}>
        <img src="../../../public/images/profile_photo.jpg" alt="" />
      </div>
      <div className={styles.senderInfo}>
        <div className={styles.senderName}>Ufuk Can Kurt</div>
        <div className={styles.lastMessage}>Siz: Görüşürüz</div>
        <div className={styles.time}>9 saat</div>
      </div>
    </div>
  );
};

export default MessagePreviewCard;
