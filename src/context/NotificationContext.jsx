import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const FETCH = import.meta.env.VITE_FETCH_URL;
      const [resCommunity, resUser] = await Promise.all([
        axios.get(`${FETCH}notifications`, { withCredentials: true }),
        axios.get(`${FETCH}user-notifications`, { withCredentials: true }),
      ]);
      const unread =
        resCommunity.data.filter((n) => !n.isRead).length +
        resUser.data.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  return (
    <NotificationContext.Provider value={{ unreadCount, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
