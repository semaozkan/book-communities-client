import { useState } from "react";
import BookCard from "../../components/bookCard/BookCard";
import dummyBooks from "../../data/dummyBooks";
import styles from "./audiobooks.module.scss";

const Audiobooks = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (bookId) => {
    setFavorites(
      (prevFavorites) =>
        prevFavorites.includes(bookId)
          ? prevFavorites.filter((id) => id !== bookId) // zaten varsa çıkar
          : [...prevFavorites, bookId] // yoksa ekle
    );
  };
  return (
    <div className={styles.audiobooks}>
      <div className={styles.imgContainer}>
        <img src="../../../public/images/audiobookImage.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <h1>Sesli Kitaplar</h1>
      </div>
      <div className={styles.booksContainer}>
        {dummyBooks.map((item) => (
          <BookCard
            key={item.id}
            book={item}
            liked={favorites.includes(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Audiobooks;
