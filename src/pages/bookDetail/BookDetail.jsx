import { useState, useEffect } from "react";
import Comments from "../../components/comments/Comments";
import styles from "./bookDetail.module.scss";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaGlasses } from "react-icons/fa";
import Summaries from "../../components/summaries/Summaries";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookDetail = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const navigate = useNavigate();

  const { bookId } = useParams();

  const [activeTab, setActiveTab] = useState("comments");
  const [bookData, setBookData] = useState(null);
  const [isAudioBook, setIsAudioBook] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${FETCH}books/${bookId}`, {
          withCredentials: true,
        });
        const bookData = res.data;
        setBookData(bookData);
        setIsAudioBook(
          bookData.audioBookUrl !== null && bookData.audioSyncJsonUrl !== null
        );
        console.log("bookData:", bookData);
      } catch (error) {
        console.error("Kitap bilgileri alınamadı:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleListenButtonClick = () => {
    navigate(`/book/listen/${bookId}`);
  };

  const handleDeleteSummary = async (summaryId) => {
    const res = await axios.delete(
      `${FETCH}books/${bookId}/summaries/${summaryId}`,
      {
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      setBookData((prev) => ({
        ...prev,
        summaries: prev.summaries.filter((s) => s._id !== summaryId),
      }));
    }
  };

  console.log("isAudioBook:", isAudioBook);
  return (
    <div className={styles.bookDetail}>
      <div className={styles.bookInfo}>
        <div className={styles.imgContainer}>
          <div className={styles.image}>
            <img src={bookData?.img} alt="" />
          </div>

          {isAudioBook && (
            <button onClick={handleListenButtonClick}>Dinle</button>
          )}
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.title}>
            <h1>{bookData?.title}</h1>
            <ul>
              <li>
                Yazan <span>{bookData?.author}</span>
              </li>
              <li>
                Yayınevi <span>{bookData?.publishingHouse}</span>
              </li>
            </ul>
          </div>

          <div className={styles.features}>
            <dl>
              <dt>Süre</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 18"
                >
                  <path
                    d="M9 .927A8.072 8.072 0 0 0 .927 9 8.072 8.072 0 0 0 9 17.073 8.072 8.072 0 0 0 17.073 9 8.072 8.072 0 0 0 9 .927ZM9 15.51A6.509 6.509 0 0 1 2.49 9 6.509 6.509 0 0 1 9 2.49 6.509 6.509 0 0 1 15.51 9 6.509 6.509 0 0 1 9 15.51Zm2.012-3.398-2.764-2.008a.393.393 0 0 1-.16-.316V4.443c0-.215.176-.39.391-.39h1.042c.215 0 .39.175.39.39v4.612l2.175 1.582a.39.39 0 0 1 .085.547l-.612.843a.393.393 0 0 1-.547.085Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {bookData?.time}
              </dd>

              <dt>Dil</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 18"
                >
                  <path d="M17.333 9A8.333 8.333 0 0 1 9 17.333 8.333 8.333 0 0 1 .667 9 8.333 8.333 0 0 1 9 .667 8.333 8.333 0 0 1 17.333 9ZM2.35 10.273l1.033.208c.256.052.52-.03.706-.215l.501-.501c.374-.404 1.012-.273 1.25.205l.303.602c.127.313.475.482.823.482.495 0 .85-.446.707-.921l-.192-.648a.78.78 0 0 1 .748-1.006h.075c.407 0 .843-.218 1.084-.58l.349-.523a.784.784 0 0 0-.027-.902l-.524-.7a.782.782 0 0 1 .437-1.227l.553-.166a.687.687 0 0 0 .537-.44l.53-1.331a6.788 6.788 0 0 0-2.271-.38C5.26 2.23 2.2 5.26 2.2 9c0 .436.07.863.149 1.273Zm12.979.172-.514.147a.516.516 0 0 1-.57-.218l-.065-.101c-.195-.306-.534-.521-.899-.521-.36 0-.729.215-.898.52l-.199.31c-.045.072-.107.133-.182.146l-1.207.684c-.56.329-.801 1.055-.554 1.67l.208.404c.28.625 1 .927 1.615.686l.11-.058c.33-.094.694-.042.977.163l.05.036a6.781 6.781 0 0 0 2.42-3.89.815.815 0 0 0-.292.022Zm-9.58 2.185 1.042.26a.517.517 0 0 0 .631-.378.517.517 0 0 0-.378-.631l-1.041-.26a.517.517 0 0 0-.632.377.517.517 0 0 0 .378.632Zm2.617-1.283a.517.517 0 0 0 .378.632.517.517 0 0 0 .631-.378l.26-1.042a.517.517 0 0 0-.377-.631.517.517 0 0 0-.632.377l-.26 1.042Zm2.774-6.748-.521 1.042a.52.52 0 0 0 .23.7.52.52 0 0 0 .7-.232l.521-1.041a.52.52 0 0 0-.23-.7.52.52 0 0 0-.7.231Z"></path>
                </svg>
                {bookData?.language}
              </dd>

              <dt>Format</dt>
              <dd
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  justifyContent: "center",
                }}
              >
                {isAudioBook && <FaHeadphonesAlt />}
                <FaGlasses />
              </dd>

              <dt>Kategori</dt>
              <dd>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#5c5c5cff"
                  viewBox="0 0 18 16"
                >
                  <path d="M15.481.5c1.022 0 1.852.829 1.852 1.852v11.111c0 1.021-.83 1.852-1.852 1.852H8.074a1.854 1.854 0 0 1-1.852-1.852V2.352C6.222 1.329 7.052.5 8.074.5h7.407ZM3.444 2.583a.694.694 0 1 1 1.39 0v10.649c0 .384-.31.694-.695.694a.693.693 0 0 1-.695-.694V2.583ZM.667 3.973a.694.694 0 1 1 1.388 0v7.87a.694.694 0 1 1-1.388 0v-7.87Z"></path>
                </svg>
                {bookData?.category}
              </dd>
            </dl>
          </div>

          <div className={styles.content}>
            <p>{bookData?.introduction}</p>
            {/* <p>
              Küçük Prens yıllardır beklenen Cemal Süreya ve Tomris Uyar
              çevirisiyle Can Çocuk Yayınlar'ında.
            </p> */}
            <p>{bookData?.translatedBy}</p>
          </div>
        </div>
      </div>

      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button
            type="button"
            className={activeTab === "comments" ? styles.active : ""}
            onClick={() => setActiveTab("comments")}
          >
            Yorumlar ve Puanlamalar
          </button>
          <button
            type="button"
            className={activeTab === "summaries" ? styles.active : ""}
            onClick={() => setActiveTab("summaries")}
          >
            Özetler
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "comments" && (
            <Comments setBookData={setBookData} book={bookData} />
          )}
          {activeTab === "summaries" && (
            <Summaries
              summaries={bookData.summaries}
              onDelete={handleDeleteSummary}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
