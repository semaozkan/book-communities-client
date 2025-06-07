import { useNavigate } from "react-router-dom";
import styles from "./summaryCard.module.scss";
import { useParams } from "react-router-dom";

import { IoTrash } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const SummaryCard = ({ summary, onDelete }) => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  console.log("içerdeki summary:", summary);

  const handleSummaryClick = () => {
    navigate(`/book/${bookId}/summaries/${summary._id}`);
  };

  const handleDeleteSummary = () => {
    onDelete(summary._id);
  };

  // Tarihi formatla
  let formattedDate = summary.date;
  if (summary.date && !isNaN(Date.parse(summary.date))) {
    formattedDate = new Date(summary.date).toLocaleDateString("tr-TR");
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <h4 className={styles.title}>{summary.title}</h4>
        <p className={styles.content}>{summary.content}</p>
        <div className={styles.readMoreContainer}>
          <button onClick={handleSummaryClick}>Daha fazlası</button>
        </div>

        {/* Eğer özet login olan kullanıcıya aitse sağ üste çöp kutusu */}
        {(() => {
          try {
            const { user } = useAuth();
            if (
              user?.user?._id === summary.userId ||
              user?.user?.username === summary.author
            ) {
              return (
                <div className={styles.deleteButtonTopRight}>
                  <IoTrash
                    className={styles.trashIcon}
                    title="Özeti Sil"
                    onClick={handleDeleteSummary}
                    style={{
                      cursor: "pointer",
                      color: "#ff4d4f",
                      fontSize: 22,
                    }}
                  />
                </div>
              );
            }
          } catch (e) {}
          return null;
        })()}

        <div className={styles.cardFooter}>
          <span className={styles.author}>Özet Yazarı: {summary.author}</span>
          <span className={styles.date}>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
