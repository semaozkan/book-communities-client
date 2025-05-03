import styles from "./navbar.module.scss";
import { FaHeart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h1>
            <a href="/">BİBLİYOFİL</a>
          </h1>
        </div>
        <div className={styles.navCenter}>
          <li>
            <a href="/audiobooks">Sesli Kitaplar</a>
          </li>

          <li>
            <a href="/communities">Topluluklar</a>
          </li>

          <li>
            <a href="/bookDonation">Kitap Bağışı</a>
          </li>

          <li className={styles.fav}>
            <FaHeart className={styles.heart} />
            <a href="/favorites">Favorilerim</a>
          </li>
        </div>
        <div className={styles.navEnd}>
          <button>
            <a href="/login">Giriş Yap</a>
          </button>
          <button>
            <a href="/register">Kaydol</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
