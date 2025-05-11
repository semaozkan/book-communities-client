import styles from "./footer.module.scss";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <footer className={styles.footer}>
        <div className={styles.left}>
          <h2>Bibliyofil</h2>
          <p>Kitap severlerin dijital buluşma noktası</p>
        </div>

        <div className={styles.center}>
          <ul>
            <li>
              <a href="/about">Hakkımızda</a>
            </li>
            <li>
              <a href="/communities">Topluluklar</a>
            </li>
            <li>
              <a href="/audiobooks">Sesli Kitaplar</a>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <p>İletişim: </p>
          <span>bibliyofil@gmail.com</span>
        </div>

        <div className={styles.right}>
          <p>Bizi Takip Et</p>
          <div className={styles.socialIcons}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
