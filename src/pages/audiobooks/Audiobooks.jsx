import { useState, useEffect } from "react";
import BookCard from "../../components/bookCard/BookCard";
import styles from "./audiobooks.module.scss";
import Search from "../../components/search/Search";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Audiobooks = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${FETCH}books`, { withCredentials: true });
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchUserFavorites = async () => {
      try {
        const res = await axios.get(`${FETCH}auth/${user.user._id}/favorites`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setFavorites(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
    fetchUserFavorites();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = books.filter((book) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (book.title && book.title.toLowerCase().includes(q)) ||
      (book.author && book.author.toLowerCase().includes(q)) ||
      (book.description && book.description.toLowerCase().includes(q))
    );
  });

  return (
    <div className={styles.audiobooks}>
      <div className={styles.imgContainer}>
        <img src="../../../public/images/audiobookImage.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <h1>Sesli Kitaplar</h1>
      </div>

      <div className={styles.searchContainer}>
        <Search
          simple={true}
          dropdown={false}
          placeholder="Kitap adı, yazar veya açıklama ile ara"
          onChange={setSearchTerm}
        />
      </div>

      {/* Sesli Kitaplar Bölümü */}
      <div
        className={styles.booksRow}
        style={{ marginTop: "48px", marginBottom: "48px" }}
      >
        {filteredBooks.map((item, i) => (
          <BookCard
            key={i}
            book={item}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>
    </div>
  );
};

export default Audiobooks;
