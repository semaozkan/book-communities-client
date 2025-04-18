import styles from "./comments.module.scss";
import Comment from "../../components/comment/Comment";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Comments = () => {
  const [star, setStar] = useState(false);
  const [commentButton, setcommentButton] = useState(false);

  const MAX_CHAR = 2000;

  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const [rating, setRating] = useState(false);

  const isCommentModalOpen = () => {
    setRating(true);
  };

  const remainingChars = MAX_CHAR - comment.length;

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
                <img src="/images/kucuk_prens.jpeg" alt="" />
              </div>
              <div className={styles.starContainer}>
                <div className={styles.starContent}>
                  <h3>4.3</h3>
                  <div className={styles.stars}>
                    <FaStar className={styles.star} />
                    <FaStar className={styles.star} />
                    <FaStar className={styles.star} />
                    <FaStar className={styles.star} />
                    <FaStar className={styles.star} />
                  </div>
                </div>
                <p>6508 yoruma göre</p>
              </div>
            </div>
          </div>
          <div className={styles.commentsContent}>
            <h4>Yorumlar</h4>
            <div className={styles.comments}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
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
                  <img src="/images/kucuk_prens.jpeg" alt="" />
                </div>
                <h4>Küçük Prens</h4>
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
