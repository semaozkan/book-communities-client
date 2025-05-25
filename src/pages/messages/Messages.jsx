import styles from "./messages.module.scss";
import MessageModal from "./../../components/MessageModal/MessageModal";
import MessagePreviewCard from "../../components/messagePreviewCard/MessagePreviewCard";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Messages = () => {
  // const [activeCardId, setActiveCardId] = useState(null);

  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user } = useAuth();
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchParams] = useSearchParams();
  const focusUserId = searchParams.get("user");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${FETCH}messages/chats/${user.user._id}`, { withCredentials: true })
      .then((res) => setChatUsers(res.data));
  }, [user]);

  useEffect(() => {
    if (chatUsers.length === 0) return;
    if (focusUserId) {
      const found = chatUsers.find((c) => c.user._id === focusUserId);
      if (found) {
        setSelectedUser(found);
        return;
      }
    }
    if (!selectedUser) setSelectedUser(chatUsers[0]);
  }, [chatUsers, focusUserId]);

  useEffect(() => {
    if (!selectedUser) return;
    const roomId = [user.user._id, selectedUser.user._id].sort().join("-");
    axios
      .get(`${FETCH}messages/room/${roomId}`, { withCredentials: true })
      .then((res) => {
        console.log("Mesajlar:", res.data);
        setMessages(Array.isArray(res.data) ? res.data : []);
      });
  }, [selectedUser, user]);

  const handleUpdateLastMessage = (roomId, lastMessage) => {
    setChatUsers((prev) =>
      prev.map((u) => (u.roomId === roomId ? { ...u, lastMessage } : u))
    );
  };

  const sortedChatUsers = [...chatUsers].sort((a, b) => {
    const aTime = a.lastMessage?.time
      ? new Date(a.lastMessage.time)
      : new Date(0);
    const bTime = b.lastMessage?.time
      ? new Date(b.lastMessage.time)
      : new Date(0);
    return bTime - aTime;
  });

  return (
    <div className={styles.messages}>
      <div className={styles.messagesContainer}>
        <div className={styles.header}>
          <p>Mesajlaşma</p>
        </div>

        <div className={styles.content}>
          <div className={styles.messagePreview}>
            {sortedChatUsers.map((c) => (
              <MessagePreviewCard
                key={c.user._id}
                isActive={selectedUser && selectedUser.user._id === c.user._id}
                onClick={() => {
                  setSelectedUser(c);
                  navigate(`/messages?user=${c.user._id}`);
                }}
                user={c.user}
                lastMessage={c.lastMessage}
                time={c.lastMessage?.time}
              />
            ))}
          </div>
          <div className={styles.messageContent}>
            {selectedUser && (
              <MessageModal
                customStyle
                selectedUser={selectedUser.user}
                currentUser={user.user}
                messages={messages}
                setMessages={setMessages}
                onUpdateLastMessage={handleUpdateLastMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
