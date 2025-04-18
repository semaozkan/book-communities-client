import styles from "./comment.module.scss";
import { FaStar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <div className={styles.userImg}>
          <FaRegUser className={styles.userIcon} />
          <img src="" alt="" />
        </div>
        <div className={styles.info}>
          <span>Sema</span>
          <div className={styles.rating}>
            <div className={styles.stars}>
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
              <FaStar className={styles.star} />
            </div>
            <div className={styles.date}>15.04.2025</div>
          </div>
        </div>
      </div>
      <p>Çok güzel bir kitaptı</p>
    </div>
  );
};

export default Comment;
