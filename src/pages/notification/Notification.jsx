import NotificationCard from "../../components/notificationCard/NotificationCard";
import styles from "./notification.module.scss";

const Notification = () => {
  return (
    <div className={styles.notification}>
      <div className={styles.container}>
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
};

export default Notification;
