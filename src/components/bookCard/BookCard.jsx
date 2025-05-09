import { useState } from "react";
import styles from "./bookCard.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookCard = ({
  book,
  liked = false,
  showDelete = false,
  onToggleFavorite,
  onRemove,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/book/${book.id}`);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(book); // dışarıdan gönderilen like işlevi varsa çalıştır
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    onRemove?.(book); // dışarıdan gönderilen remove işlevi varsa çalıştır
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {showDelete && (
        <button className={styles.removeButton} onClick={handleRemoveClick}>
          ✕
        </button>
      )}
      <div
        className={`${styles.imgContainer} ${
          showDelete ? styles.deleteActive : ""
        }`}
      >
        <div className={styles.bookImg}>
          <img src={book?.image} alt="kucuk_prens" />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.bookName}>{book?.title}</span>
        <span className={styles.author}>{book?.author}</span>
      </div>
      {!showDelete && (
        <div className={styles.iconContainer}>
          <div onClick={handleLikeClick}>
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
      )}
    </div>
  );
};

export default BookCard;
