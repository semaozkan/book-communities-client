import { useState } from "react";
import styles from "./summaries.module.scss";
import SummaryCard from "../summaryCard/SummaryCard";
import { useNavigate, useParams } from "react-router-dom";

const Summaries = ({ summaries, onDelete }) => {
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleAddSummaryClick = () => {
    navigate(`/book/${bookId}/summaries/add`);
  };

  return (
    <div className={styles.summaries}>
      <div className={styles.summariesContainer}>
        <div className={styles.titleContainer}>
          <h1>Özetler</h1>
          <button onClick={handleAddSummaryClick}>Özet Ekle</button>
        </div>

        <div className={styles.summaryCardContainer}>
          {summaries.length === 0 ? (
            <div className={styles.emptyState}>
              <img
                src="/images/empty-summary.svg"
                alt="Özet yok"
                className={styles.emptyImg}
              />
              <div className={styles.emptyText}>
                Henüz hiç özet eklenmemiş. İlk özeti sen ekle!
              </div>
            </div>
          ) : (
            summaries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} onDelete={onDelete} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Summaries;
