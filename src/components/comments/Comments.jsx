import styles from "./comments.module.scss";
import Comment from "../../components/comment/Comment";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const MAX_CHAR = 2000;

const Comments = ({ setBookData, book }) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user } = useAuth();

  const [commentButton, setcommentButton] = useState(false);
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(0);

  const [rating, setRating] = useState(false);

  const remainingChars = MAX_CHAR - comment?.length;

  useEffect(() => {
    if (book && book.ratings && user?.user) {
      const userRating = book.ratings.find((r) => r.user._id === user.user._id);
      setStar(userRating?.rating || 0);
      setComment(userRating?.comment || "");
    }
  }, [book, user]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const isCommentModalOpen = () => {
    setRating(true);
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      `${FETCH}books/${book._id}/rate`,
      { rating: star, comment },
      { withCredentials: true }
    );
    setRating(false);
    setStar(false);
    setcommentButton(false);
    setComment("");
    setBookData((prev) => ({
      ...prev,
      ratings: res.data.ratings,
      averageRating: res.data.average,
    }));
  };

  return (
    <div>
      <div className={styles.commentContainer}>
        <div className={styles.titleContainer}>
          <h1>Puanlamalar ve Yorumlar</h1>
          <button onClick={isCommentModalOpen}>Değerlendir</button>
        </div>

        <div className={styles.ratingContainer}>
          <div className={styles.ratings}>
            <h4>Puan ortalaması</h4>
            <div className={styles.averageRating}>
              <div className={styles.imgContainer}>
                <img src={book?.img} alt="" />
              </div>
              <div className={styles.starContainer}>
                <div className={styles.starContent}>
                  <h3>
                    {book?.averageRating
                      ? Number(book.averageRating).toFixed(1)
                      : "-"}
                  </h3>
                  <div className={styles.stars}>
                    {(() => {
                      const avg = book?.averageRating || 0;
                      return Array.from({ length: 5 }, (_, i) => {
                        if (avg >= i + 1) {
                          // Tam dolu yıldız
                          return (
                            <FaStar
                              key={i}
                              className={styles.star}
                              style={{ color: "#ffc100" }}
                            />
                          );
                        } else if (avg > i && avg < i + 1) {
                          // Yarım yıldız
                          return (
                            <FaStar
                              key={i}
                              className={styles.star}
                              style={{
                                color: "#ffc100",
                                clipPath: "inset(0 50% 0 0)",
                              }}
                            />
                          );
                        } else {
                          // Boş yıldız
                          return (
                            <FaStar
                              key={i}
                              className={styles.star}
                              style={{ color: "#d8d8d8" }}
                            />
                          );
                        }
                      });
                    })()}
                  </div>
                </div>
                <p>{book?.ratings.length} yoruma göre</p>
              </div>
            </div>
          </div>
          <div className={styles.commentsContent}>
            <h4>Yorumlar</h4>
            <div className={styles.comments}>
              {book?.ratings.length === 0 ? (
                <div className={styles.emptyState}>
                  <img
                    src="/images/empty-comments.svg"
                    alt="Yorum yok"
                    className={styles.emptyImg}
                  />
                  <div className={styles.emptyText}>
                    Henüz hiç yorum yapılmamış. İlk yorumu sen ekle!
                  </div>
                </div>
              ) : (
                book?.ratings.map((rating, index) => (
                  <Comment
                    key={index}
                    rating={rating}
                    setBookData={setBookData}
                    book={book}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {rating && (
        <div className={styles.isCommentModalOpenContainer}>
          <div className={styles.isCommentModalOpen}>
            <div className={styles.header}>
              <div className={styles.title}>Kitabı Değerlendir</div>
              <div onClick={() => setRating(false)} className={styles.close}>
                <IoClose className={styles.closeIcon} />
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.bookContainer}>
                <div className={styles.bookImg}>
                  <img src={book?.img} alt="" />
                </div>
                <h4>{book?.title}</h4>
              </div>
              <div className={styles.commentContent}>
                <div className={styles.rating}>
                  <span>Kitabı Değerlendir</span>

                  <div className={styles.starsContainer}>
                    <FaStar
                      className={`${styles.star} ${
                        star >= 1 ? styles.yellowStar : styles.starIcon
                      }`}
                      onClick={() => {
                        setStar(1);
                        setcommentButton(true);
                      }}
                    />
                    <FaStar
                      className={`${styles.star} ${
                        star >= 2 ? styles.yellowStar : styles.starIcon
                      }`}
                      onClick={() => {
                        setStar(2);
                        setcommentButton(true);
                      }}
                    />
                    <FaStar
                      className={`${styles.star} ${
                        star >= 3 ? styles.yellowStar : styles.starIcon
                      }`}
                      onClick={() => {
                        setStar(3);
                        setcommentButton(true);
                      }}
                    />
                    <FaStar
                      className={`${styles.star} ${
                        star >= 4 ? styles.yellowStar : styles.starIcon
                      }`}
                      onClick={() => {
                        setStar(4);
                        setcommentButton(true);
                      }}
                    />
                    <FaStar
                      className={`${styles.star} ${
                        star >= 5 ? styles.yellowStar : styles.starIcon
                      }`}
                      onClick={() => {
                        setStar(5);
                        setcommentButton(true);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.comment}>
                  <span>Yorumunuz</span>
                  <div className={styles.commentSide}>
                    <textarea
                      name="comment"
                      id="comment"
                      placeholder="Etkileyici bir kitaptı. Kesinlikle tavsiye ederim."
                      maxLength={MAX_CHAR}
                      minLength={0}
                      value={comment}
                      onChange={handleChange}
                    ></textarea>
                    <div className={styles.counter}>{remainingChars}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.commentButton}>
              <div
                className={`${styles.button} ${
                  commentButton ? styles.enableButton : styles.disabled
                }`}
                onClick={handleSubmit}
              >
                Yorum Yap
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
