// import BookCard from "../../components/bookCard/BookCard";
import Slider from "../../components/slider/Slider";
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
      <div className={styles.secondSection}>
        <div className={styles.secondSectionTitle}>Sesli Kitaplar</div>
        <div className={styles.books}>
          <Slider />
        </div>
      </div>
      <div className={styles.thirdSection}></div>
    </div>
  );
};

export default Home;
