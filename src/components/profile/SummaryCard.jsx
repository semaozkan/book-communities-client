import styles from "./summaryCard.module.scss";
import { useNavigate } from "react-router-dom";

const SummaryCard = ({ summary }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img
        src={summary.image || "/images/summary_default.jpg"}
        alt="özet"
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.title}>{summary.title}</div>
        {summary?.desc && <div className={styles.desc}>{summary?.desc}</div>}
      </div>
      <button
        className={styles.button}
        onClick={() =>
          navigate(`/book/${summary.bookId}/summaries/${summary._id}`)
        }
      >
        Detaya Git
      </button>
    </div>
  );
};

export default SummaryCard;
