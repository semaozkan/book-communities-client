import BookCard from "../../components/bookCard/BookCard";
import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.firstSection}>
        <div className={styles.imageContainer}>
          <img src="/images/home.jpg" alt="" />
        </div>
        <div className={styles.searchBar}>
          <input type="text" placeholder="Kitap ara" />
          <button>Ara</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
