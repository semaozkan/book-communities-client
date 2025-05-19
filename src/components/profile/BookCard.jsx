import styles from "./bookCard.module.scss";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img
        src={book.image || "/images/book_default.jpg"}
        alt="kitap"
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.title}>{book.title}</div>
        <div className={styles.author}>{book.author}</div>
      </div>
      <button
        className={styles.button}
        onClick={() => navigate(`/book/${book._id}`)}
      >
        Detaya Git
      </button>
    </div>
  );
};

export default BookCard;
