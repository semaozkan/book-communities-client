import BookCard from "../../components/bookCard/BookCard";
import dummyBooks from "../../data/dummyBooks";
import styles from "./audiobooks.module.scss";

const Audiobooks = () => {
  return (
    <div className={styles.audiobooks}>
      <div className={styles.imgContainer}>
        <img src="/images/audiobooks.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,96L60,85.3C120,75,240,53,360,58.7C480,64,600,96,720,133.3C840,171,960,213,1080,202.7C1200,192,1320,128,1380,96L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>

        <h1>Sesli Kitaplar</h1>
      </div>
      <div className={styles.booksContainer}>
        {dummyBooks.map((item) => (
          <BookCard key={item.id} book={item} />
        ))}
      </div>
    </div>
  );
};

export default Audiobooks;
