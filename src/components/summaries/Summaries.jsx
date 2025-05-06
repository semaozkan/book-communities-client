import { useState } from "react";
import styles from "./summaries.module.scss";
import SummaryCard from "../summaryCard/SummaryCard";
import { useNavigate, useParams } from "react-router-dom";

const Summaries = ({ summaries }) => {
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
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Summaries;
