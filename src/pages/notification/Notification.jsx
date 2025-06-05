import NotificationCard from "../../components/notificationCard/NotificationCard";
import styles from "./notification.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";

const Notification = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const [notifications, setNotifications] = useState([]);
  const { fetchNotifications } = useNotification();

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        // Community notifications
        const resCommunity = await axios.get(`${FETCH}notifications`, {
          withCredentials: true,
        });
        // User-to-user notifications
        const resUser = await axios.get(`${FETCH}user-notifications`, {
          withCredentials: true,
        });
        // Bildirimleri birleştir, tarihe göre sırala
        const allNotifications = [...resCommunity.data, ...resUser.data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setNotifications(allNotifications);
        // Context'i güncelle
        fetchNotifications();
      } catch (err) {
        // Hata yönetimi
      }
    };
    loadNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const notification = notifications.find((n) => n._id === id);
      let url;
      if (notification.community) {
        url = `${FETCH}notifications/${id}`;
      } else {
        url = `${FETCH}user-notifications/${id}`;
      }
      await axios.delete(url, { withCredentials: true });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      // Context'i güncelle
      fetchNotifications();
    } catch (err) {}
  };

  const handleRead = async (id) => {
    try {
      // Bildirimin tipine göre endpoint seç
      const notification = notifications.find((n) => n._id === id);
      let url;
      if (notification.community) {
        url = `${FETCH}notifications/${id}/read`;
      } else {
        url = `${FETCH}user-notifications/${id}/read`;
      }
      await axios.put(url, {}, { withCredentials: true });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      // Context'i güncelle
      fetchNotifications();
    } catch (err) {}
  };

  const handleReadAll = async () => {
    try {
      // Her iki endpointi de çağır
      await Promise.all([
        axios.put(
          `${FETCH}notifications/read-all`,
          {},
          { withCredentials: true }
        ),
        axios.put(
          `${FETCH}user-notifications/read-all`,
          {},
          { withCredentials: true }
        ),
      ]);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      // Context'i güncelle
      fetchNotifications();
    } catch (err) {}
  };

  const handleDeleteAll = async () => {
    try {
      await Promise.all([
        axios.delete(`${FETCH}notifications/delete-all`, {
          withCredentials: true,
        }),
        axios.delete(`${FETCH}user-notifications/delete-all`, {
          withCredentials: true,
        }),
      ]);
      setNotifications([]);
      fetchNotifications();
    } catch (err) {}
  };

  return (
    <div className={styles.notification}>
      <div className={styles.container}>
        <div className={styles.header}>
          Bildirimler
          {notifications.length > 0 && (
            <>
              <button
                style={{
                  float: "right",
                  marginLeft: 16,
                  fontSize: 14,
                  background: "#ffeaea",
                  border: "none",
                  borderRadius: 6,
                  padding: "6px 16px",
                  cursor: "pointer",
                  color: "#e53935",
                }}
                onClick={handleDeleteAll}
              >
                Hepsini Sil
              </button>
              {notifications.some((n) => !n.isRead) && (
                <button
                  style={{
                    float: "right",
                    marginLeft: 16,
                    fontSize: 14,
                    background: "#e3f2fd",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 16px",
                    cursor: "pointer",
                  }}
                  onClick={handleReadAll}
                >
                  Tümünü Okundu Yap
                </button>
              )}
            </>
          )}
        </div>
        <div className={styles.notifications}>
          {notifications.length === 0 ? (
            <div style={{ padding: 32, color: "#888", textAlign: "center" }}>
              Hiç bildiriminiz yok.
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onDelete={handleDelete}
                onRead={handleRead}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
