import { useState, useEffect } from "react";
import styles from "./bookCard.module.scss";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const BookCard = ({
  book,
  showDelete = false,
  onClick,
  favorites,
  setFavorites,
}) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const navigate = useNavigate();

  const [isAudioBook, setIsAudioBook] = useState(
    book.audioBookUrl !== null || book.audioSyncJsonUrl !== null
  );
  const [isLiked, setIsLiked] = useState(
    favorites?.some((fav) => fav._id === book._id)
  );

  useEffect(() => {
    setIsLiked(favorites?.some((fav) => fav._id === book._id));
  }, [favorites, book._id]);

  // console.log("isliked:",isLiked)

  const handleCardClick = () => {
    if (onClick) {
      onClick(book); // Eğer dışarıdan onClick fonksiyonu gelmişse onu çalıştır
    } else {
      navigate(`/book/${book._id}`); // yoksa detay sayfasına git
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `${FETCH}auth/favorites`,
        { bookId: book._id },
        { withCredentials: true }
      );
      console.log("res", res);
      if (res.status === 200 && Array.isArray(res.data)) {
        setFavorites(res.data);
      }
    } catch (err) {
      console.error("Favori güncellenirken hata:", err);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {showDelete && (
        <>
          <button className={styles.removeButton} onClick={handleLikeClick}>
            ✕
          </button>

          {isAudioBook && <FaHeadphonesAlt className={styles.headphoneIcon} />}
        </>
      )}
      <div
        className={`${styles.imgContainer} ${
          showDelete ? styles.deleteActive : ""
        }`}
      >
        <div className={styles.bookImg}>
          <img src={book?.img} alt="kucuk_prens" />
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.bookName}>{book?.title}</span>
        <span className={styles.author}>{book?.author}</span>
      </div>
      {!showDelete && (
        <div className={styles.iconContainer}>
          <div onClick={handleLikeClick}>
            {isLiked ? (
              <FaHeart className={styles.heart} />
            ) : (
              <FaRegHeart className={styles.heart} />
            )}
          </div>
          <div>
            {isAudioBook && <FaHeadphonesAlt className={styles.headphone} />}
            <FaGlasses className={styles.book} />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookCard;
