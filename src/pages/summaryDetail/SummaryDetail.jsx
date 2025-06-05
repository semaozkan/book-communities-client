import { useNavigate, useParams } from "react-router-dom";
import styles from "./summaryDetail.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const SummaryDetail = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { summaryId, bookId } = useParams();
  const navigate = useNavigate();

  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${FETCH}books/${bookId}`, {
          withCredentials: true,
        });
        const bookData = res.data;
        setSummaryData(
          bookData.summaries.find((summary) => summary._id === summaryId)
        );
      } catch (error) {
        console.error("Kitap bilgileri alınamadı:", error);
      }
    };
    fetchSummary();
  }, [summaryId, bookId]);

  // Tarihi formatla
  let formattedDate = summaryData?.date;
  if (summaryData?.date && !isNaN(Date.parse(summaryData.date))) {
    formattedDate = new Date(summaryData.date).toLocaleDateString("tr-TR");
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailContent}>
        <div className={styles.header}>
          <h1>{summaryData?.title}</h1>
        </div>

        <div className={styles.meta}>
          <span>Yazar: {summaryData?.author}</span>
          <span>{formattedDate}</span>
        </div>
        <p className={styles.content}>{summaryData?.content}</p>

        <button onClick={() => navigate(-1)} className={styles.backButton}>
          ← Geri Dön
        </button>
      </div>
    </div>
  );
};

export default SummaryDetail;
