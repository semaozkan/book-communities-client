import styles from "./addSummary.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AddSummary = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const { bookId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  console.log("özet user:", user.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSummary = {
      title,
      author: user.user.fullname,
      date: new Date().toLocaleDateString("tr-TR"), // "21.05.2025"
      content,
    };

    try {
      const res = await axios.post(
        `${FETCH}books/${bookId}/summaries`,
        newSummary,
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate(`/book/${bookId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.addSummaryContainer}>
      <div className={styles.detailContainer}>
        <form className={styles.detailContent} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <input
              type="text"
              placeholder="Özet Başlığı"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.inputTitle}
            />
          </div>

          <textarea
            placeholder="Özet içeriği..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            rows={15}
            required
          />

          <div className={styles.saveButton}>
            <button type="submit">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSummary;
