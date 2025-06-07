import styles from "./notificationCard.module.scss";
import { IoIosClose } from "react-icons/io";
import { BsCheck2Circle } from "react-icons/bs";
import { Link } from "react-router-dom";

function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "şimdi";
  if (diff < 3600) return `${Math.floor(diff / 60)} dk`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} saat`;
  return `${Math.floor(diff / 86400)} gün`;
}

function communityNameWithSuffix(name, suffix = "na") {
  if (!name) return "";
  const lower = name.trim().toLowerCase();
  if (lower.endsWith("topluluğu")) {
    if (suffix === "na") return `${name}’na`;
    if (suffix === "n") return `${name}’n`;
    if (suffix === "da") return `${name}’da`;
    return `${name}’${suffix}`;
  }
  if (suffix === "na") return `${name} topluluğuna`;
  if (suffix === "n") return `${name} topluluğunun`;
  if (suffix === "da") return `${name} topluluğunda`;
  return `${name} topluluğu${suffix}`;
}

function getNotificationMessage(notification) {
  const sender = notification.relatedUser;
  const community = notification.community;
  switch (notification.type) {
    case "JOIN_REQUEST":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>{" "}
          <span>
            <Link
              to={community ? `/community/${community._id}` : "#"}
              className={styles.link}
            >
              {communityNameWithSuffix(community?.name, "na")}
            </Link>
            {" katılmak istiyor."}
          </span>
        </>
      );
    case "JOIN_ACCEPTED":
      return (
        <>
          <b>
            <Link
              to={community ? `/community/${community._id}` : "#"}
              className={styles.link}
            >
              {community?.name}
            </Link>
          </b>
          {" katılım isteğin "}
          <b>kabul edildi</b>.
        </>
      );
    case "JOIN_REJECTED":
      return (
        <>
          <b>
            <Link
              to={community ? `/community/${community._id}` : "#"}
              className={styles.link}
            >
              {community?.name}
            </Link>
          </b>
          {" katılım isteğin "}
          <b>reddedildi</b>.
        </>
      );
    case "NEW_POST":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>{" "}
          <span>
            <Link
              to={community ? `/community/${community._id}` : "#"}
              className={styles.link}
            >
              {communityNameWithSuffix(community?.name, "da")}
            </Link>
            {" yeni bir gönderi paylaştı."}
          </span>
        </>
      );
    case "NEW_COMMENT":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>{" "}
          gönderine yorum yaptı.
        </>
      );
    case "POST_LIKE":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>{" "}
          gönderini beğendi.
        </>
      );
    case "MEETING_STARTED":
      return (
        <>
          <b>
            <Link
              to={community ? `/community/${community._id}` : "#"}
              className={styles.link}
            >
              {communityNameWithSuffix(community?.name, "da")}
            </Link>
          </b>
          {" yeni bir toplantı başladı."}
        </>
      );
    case "NEW_MESSAGE":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>
          <span>
            {" "}
            <Link
              to={sender ? `/messages?user=${sender._id}` : "#"}
              className={styles.link}
              style={{ fontWeight: 400 }}
            >
              size mesaj gönderdi.
            </Link>
          </span>
        </>
      );
    case "DONATION_REQUESTED":
      return (
        <>
          <b>
            <Link
              to={sender ? `/profile/${sender._id}` : "#"}
              className={styles.link}
            >
              {sender?.fullname || sender?.username}
            </Link>
          </b>{" "}
          bağışınıza talepte bulundu.
        </>
      );
    case "DONATION_ACCEPTED":
      return (
        <>
          Bağış talebiniz <b>kabul edildi</b>.
        </>
      );
    case "DONATION_REJECTED":
      return (
        <>
          Bağış talebiniz <b>reddedildi</b>.
        </>
      );
    case "DONATION_COMPLETED":
      return (
        <>
          Bağış işlemi <b>tamamlandı</b>.
        </>
      );
    default:
      return notification.content;
  }
}

const NotificationCard = ({ notification, onDelete, onRead }) => {
  const sender = notification.relatedUser;
  const community = notification.community;
  return (
    <div
      className={styles.notificationCard}
      style={{ background: notification.isRead ? "#f7f7f7" : "#e3f2fd" }}
    >
      <div className={styles.notificationContent}>
        <div className={styles.senderImage}>
          <img
            src={
              sender?.profilePicture ||
              community?.profileImage ||
              "/images/profile_photo.jpg"
            }
            alt=""
          />
        </div>
        <div className={styles.messageContent}>
          <p>{getNotificationMessage(notification)}</p>
        </div>
      </div>
      <div className={styles.cardEnd}>
        <div className={styles.time}>{timeAgo(notification.createdAt)}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            title={notification.isRead ? "Okundu" : "Okundu yap"}
            onClick={() => !notification.isRead && onRead?.(notification._id)}
            style={{
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: notification.isRead ? "default" : "pointer",
              outline: "none",
              display: "flex",
              alignItems: "center",
            }}
            disabled={notification.isRead}
          >
            <BsCheck2Circle
              size={22}
              color={notification.isRead ? "#bbb" : "#2196f3"}
              style={{ opacity: notification.isRead ? 0.5 : 1 }}
            />
          </button>
          <IoIosClose
            className={styles.deleteButton}
            onClick={() => onDelete?.(notification._id)}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
