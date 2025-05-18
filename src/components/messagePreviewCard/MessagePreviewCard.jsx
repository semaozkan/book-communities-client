import { useState } from "react";
import styles from "./messagePreviewCard.module.scss";

const MessagePreviewCard = ({
  isActive,
  onClick,
  user,
  lastMessage,
  currentUserId,
}) => {
  return (
    <div
      className={`${styles.messagePreviewCard} ${
        isActive ? styles.active : ""
      }`}
      onClick={onClick}
    >
      <div className={styles.imageContainer}>
        <img src={user?.profilePicture || "/images/profile_photo.jpg"} alt="" />
      </div>
      <div className={styles.senderInfo}>
        <div className={styles.senderName}>
          {user?.fullname || user?.username}
        </div>
        <div className={styles.lastMessage}>
          {lastMessage
            ? `${lastMessage.senderId === currentUserId ? "Siz: " : ""}${
                lastMessage.text
              }`
            : ""}
        </div>
        <div className={styles.time}>9 saat</div>
      </div>
    </div>
  );
};

export default MessagePreviewCard;
