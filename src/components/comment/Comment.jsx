import styles from "./comment.module.scss";
import { FaStar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Comment = ({ rating, setBookData, book }) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user: loggedInUser } = useAuth();
  // Kullanıcı bilgisi
  const user = rating.user || {};
  const userName = user.fullname || user.username || "Kullanıcı";
  const userImg = user.profilePicture || "";
  // Tarih formatı
  const dateStr = rating.createdAt
    ? new Date(rating.createdAt).toLocaleDateString()
    : "";
  // Yıldızlar
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FaStar
      key={i}
      className={styles.star}
      style={{ color: i < rating.rating ? "#FFD700" : "#ddd" }}
    />
  ));

  const handleDeleteComment = async () => {
    const res = await axios.delete(`${FETCH}books/${book._id}/rate`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      setBookData((prev) => ({
        ...prev,
        ratings: prev.ratings.filter((r) => r._id !== rating._id),
        averageRating: res.data.average,
      }));
    }
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        {/* Eğer login olan kullanıcıya aitse sağ üste çöp kutusu */}
        {loggedInUser && loggedInUser.user._id === rating.user._id && (
          <div
            className={styles.deleteButtonTopRight}
            onClick={handleDeleteComment}
          >
            <IoTrash />
          </div>
        )}
        <div className={styles.userImg}>
          {userImg ? (
            <img src={userImg} alt={userName} />
          ) : (
            <FaRegUser className={styles.userIcon} />
          )}
        </div>
        <div className={styles.info}>
          <span>{userName}</span>
          <div className={styles.rating}>
            <div className={styles.stars}>{stars}</div>
            <div className={styles.date}>{dateStr}</div>
          </div>
        </div>
      </div>
      <p>{rating.comment}</p>
    </div>
  );
};

export default Comment;
