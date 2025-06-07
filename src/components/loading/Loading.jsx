import React from "react";
import styles from "./loading.module.scss";
import { FaBookOpen, FaHeadphonesAlt } from "react-icons/fa";

const Loading = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.iconWrap}>
      <FaBookOpen className={styles.loaderBook} />
      <FaHeadphonesAlt className={styles.loaderHeadphones} />
    </div>
    <span className={styles.loadingText}>Yükleniyor...</span>
  </div>
);

export default Loading;
