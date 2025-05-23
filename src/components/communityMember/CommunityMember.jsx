import styles from "./communityMember.module.scss";
import { IoIosSend } from "react-icons/io";
import { FaUserMinus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const CommunityMember = ({
  customStyle,
  member,
  setMessages,
  setCurrentUser,
  isAdmin,
  adminId,
  communityId,
  setCommunity,
  onMessageClick,
}) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user: loggedInUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);

  useEffect(() => {
    setIsLoggedInUser(loggedInUser.user._id === member._id);
  }, [member]);

  const fetchUserMessages = async () => {
    setCurrentUser(member);
    try {
      const roomId = [loggedInUser.user._id, member._id].sort().join("-");
      const res = await axios.get(`${FETCH}messages/room/${roomId}`, {
        withCredentials: true,
      });

      setMessages(Array.isArray(res.data) ? res.data : []);

      onMessageClick();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveMember = async () => {
    try {
      const res = await axios.post(
        `${FETCH}communities/${communityId}/remove-member`,
        { userId: member._id },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setCommunity((prev) => ({
          ...prev,
          members: prev.members.filter((m) => m._id !== member._id),
        }));
        setShowModal(false);
      } else {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.communityMember}>
      <div className={customStyle}>
        <div className={styles.memberContainer}>
          <div className={styles.imgContainer}>
            <img src={member.profilePicture} alt="" />
          </div>
          <div className={styles.memberInfo}>
            <div className={styles.name}>{member.fullname}</div>
            <div className={styles.role}>
              {member._id === adminId
                ? "Topluluk Yöneticisi"
                : "Topluluk Üyesi"}
            </div>

            <div className={styles.buttonGroup}>
              {!isLoggedInUser && (
                <button
                  onClick={fetchUserMessages}
                  className={styles.messageButton}
                >
                  <IoIosSend className={styles.sendIcon} />
                  Mesaj
                </button>
              )}

              {isAdmin && !isLoggedInUser && (
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className={styles.removeButton}
                >
                  <FaUserMinus className={styles.removeIcon} />
                  Topluluktan Çıkar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalTitle}>Topluluktan Çıkar</div>
            <div className={styles.modalText}>
              Bu üyeyi topluluktan çıkarmak istediğinize emin misiniz?
            </div>
            <div className={styles.modalActions}>
              <button
                className={styles.confirmButton}
                onClick={handleRemoveMember}
              >
                Evet, Çıkar
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className={styles.cancelButton}
              >
                Vazgeç
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityMember;
