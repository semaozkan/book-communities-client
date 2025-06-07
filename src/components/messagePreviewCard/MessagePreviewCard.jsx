import { useState } from "react";
import styles from "./messagePreviewCard.module.scss";

function timeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);
  if (diff < 60) return `${diff} sn önce`;
  if (diff < 3600) return `${Math.floor(diff / 60)} dk önce`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat önce`;
  return `${Math.floor(diff / 86400)} gün önce`;
}

const MessagePreviewCard = ({
  isActive,
  onClick,
  user,
  lastMessage,
  time,
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
        <div className={styles.time}>
          {time
            ? timeAgo(time)
            : lastMessage?.time
            ? timeAgo(lastMessage.time)
            : ""}
        </div>
      </div>
    </div>
  );
};

export default MessagePreviewCard;
