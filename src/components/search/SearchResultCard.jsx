import styles from "./searchResultCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FaHeadphonesAlt } from "react-icons/fa";

const SearchResultCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(`/book/${book._id}`)}>
      <img
        src={book.img || "/images/book-default.png"}
        alt={book.title}
        className={styles.cover}
      />
      <div className={styles.info}>
        <h4>{book.title}</h4>
        <span className={styles.author}>{book.author}</span>
        <div className={styles.meta}>
          {book.audioBookUrl && (
            <span className={styles.audio}>
              <FaHeadphonesAlt /> Sesli Kitap
            </span>
          )}
          <span className={styles.category}>{book.category}</span>
        </div>
        <p className={styles.desc}>{book.description?.slice(0, 80)}...</p>
      </div>
    </div>
  );
};

export default SearchResultCard;
