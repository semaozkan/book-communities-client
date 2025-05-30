import { useEffect, useState } from "react";
import BookCard from "../../components/bookCard/BookCard";
import styles from "./favorites.module.scss";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Favorites = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const res = await axios.get(`${FETCH}auth/${user.user._id}/favorites`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setFavorites(res.data);
          console.log(" user favorites: ", res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFavorites();
  }, []);

  return (
    <div className={styles.favorites}>
      <div className={styles.imgContainer}>
        <img src="../../../public/images/favorites.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,160L80,144C160,127,320,96,480,117.3C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <h1>Favori Kitaplarım </h1>
      </div>

      <div className={styles.favoriteBooks}>
        {favorites.length > 0 ? (
          favorites.map((item) => (
            <BookCard
              key={item._id}
              book={item}
              showDelete={true}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))
        ) : (
          <p>Hiç favori kitabınız yok.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
