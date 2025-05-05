import styles from "./addSummary.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const AddSummary = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSummary = {
      id: Date.now().toString(), // örnek ID
      bookId,
      title,
      author,
      date: new Date().toLocaleDateString("tr-TR"),
      content,
    };

    console.log("Yeni Özet:", newSummary);
    // TODO: backend'e gönderilecek (axios.post vs.)

    navigate(`/book/${bookId}`);
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
