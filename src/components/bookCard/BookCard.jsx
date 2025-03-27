import { useState } from "react";
import styles from "./bookCard.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";

const BookCard = () => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <div className={styles.bookImg}>
          <img src="/images/kucuk_prens.jpg" alt="kucuk_prens" />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.bookName}>Küçük Prens</span>
        <span className={styles.author}>Antoine de Saint-Exupéry</span>
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
