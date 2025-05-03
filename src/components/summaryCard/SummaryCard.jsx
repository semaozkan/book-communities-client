import { useNavigate } from "react-router-dom";
import styles from "./summaryCard.module.scss";

const SummaryCard = ({ summary }) => {
  const navigate = useNavigate();

  const handleSummaryClick = () => {
    console.log("click");
    navigate(`/book/${summary.bookId}/summaries/${summary.id}`);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{summary.title}</h4>
        <p className={styles.content}>{summary.content}</p>
        <div className={styles.readMoreContainer}>
          <button onClick={handleSummaryClick}>Daha fazlası</button>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.author}>Özet Yazarı: {summary.author}</span>
          <span className={styles.date}>{summary.date}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
