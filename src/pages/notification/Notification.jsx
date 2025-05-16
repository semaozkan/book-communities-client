import NotificationCard from "../../components/notificationCard/NotificationCard";
import styles from "./notification.module.scss";

const Notification = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.container}>
        <div className={styles.header}>Bildirimler</div>

        <div className={styles.notifications}>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
      </div>
    </div>
  );
};

export default Notification;
