// import BookCard from "../../components/bookCard/BookCard";
import Slider from "../../components/slider/Slider";
import styles from "./home.module.scss";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
// import { bookData } from "../../data/bookData";
import BookCard from "./../../components/bookCard/BookCard";
import { communityData } from "../../data/communityData";
import CommunityCard from "../../components/communityCard/CommunityCard";
import Search from "../../components/search/Search";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${FETCH}books`, {
          withCredentials: true,
        });
        setBooks(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Kitaplar getirilirken hata:", err);
      }
    };
    const fetchUserFavorites = async () => {
      try {
        const res = await axios.get(`${FETCH}auth/${user.user._id}/favorites`, {
          withCredentials: true,
        });
        setFavorites(res.data);
        console.log("fav:", res.data);
      } catch (err) {
        console.error("Favoriler getirilirken hata:", err);
      }
    };
    const fetchAllCommunities = async () => {
      try {
        const res = await axios.get(`${FETCH}communities`, {
          withCredentials: true,
        });
        setCommunities(res.data);
        console.log("communities", res.data);
      } catch (err) {
        console.error("Topluluklar getirilirken hata:", err);
      }
    };
    fetchBooks();
    fetchUserFavorites();
    fetchAllCommunities();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.firstSection}>
        <div className={styles.imageContainer}>
          <img src="/images/home.jpg" alt="" />
        </div>
        <div className={styles.entryContainer}>
          <div className={styles.title}>Bibliyofil Dünyasına Hoş Geldiniz!</div>
          <div className={styles.text}>
            Kitap okumayı sevenleri bir araya getiren, paylaşmayı seven bir
            topluluğun parçası olmaya hazır mısınız? Okuma deneyiminizi
            zenginleştirecek etkinlikler, öneriler ve topluluklar sizi bekliyor.
            Hadi, birlikte keşfedelim!
          </div>

          <Search />
          {/* <div className={styles.searchBar}>
            <input type="text" placeholder="Kitap ara" />
            <button>Ara</button>
          </div> */}
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.content}>
          <div className={styles.secondSectionTitle}>Sesli Kitaplar</div>
          <div className={styles.books}>
            <Slider
              items={books}
              cardWidth={180}
              renderItem={(book) => (
                <BookCard
                  book={book}
                  favorites={favorites}
                  setFavorites={setFavorites}
                />
              )}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.secondSectionTitle}>Topluluklar</div>
          <div className={styles.communities}>
            <Slider
              items={communities}
              cardWidth={480}
              itemsPerPage={2}
              renderItem={(community) => (
                <CommunityCard key={community.id} community={community} />
              )}
            />
          </div>
        </div>
      </div>
      <div className={styles.thirdSection}>
        <div className={styles.thirdSectionContent}>
          <div className={styles.imgContainer}>
            <img src="/images/books2.png" alt="books" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              En Sevdiğiniz Kitaplar <br />
              <span>Burada!</span>
            </div>
            <div className={styles.text}>
              <br />
              Bibliyofil’de favori kitaplarını keşfet, okuma arkadaşları edin,
              sesli kitapları dinle ve kitaplar üzerine sohbet et. Okumak sadece
              bireysel bir yolculuk değil — birlikte daha keyifli!
            </div>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <RiCompassDiscoverLine />
                <span>Keşfet</span>
              </div>

              <div className={styles.icon}>
                <FaHeadphonesAlt />
                <span>Dinle</span>
              </div>

              <div className={styles.icon}>
                <FaUsers />
                <span>Katıl</span>
              </div>
            </div>
            <a href="">
              <button>Daha fazlasını keşfedin</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
