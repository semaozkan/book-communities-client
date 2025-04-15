import { useState } from "react";
import styles from "./bookCard.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imgContainer}>
        <div className={styles.bookImg}>
          <img src={book?.image} alt="kucuk_prens" />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.bookName}>{book?.title}</span>
        <span className={styles.author}>{book?.author}</span>
      </div>

      <div className={styles.iconContainer}>
        <div onClick={toggleLike}>
          {liked ? (
            <FaHeart className={styles.heart} />
          ) : (
            <FaRegHeart className={styles.heart} />
          )}
        </div>
        <div>
          <FaHeadphonesAlt className={styles.headphone} />
        </div>
      </div>
    </div>
  );
};

export default BookCard;
