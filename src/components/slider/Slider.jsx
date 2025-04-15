import { useState } from "react";
import BookCard from "../bookCard/BookCard";
import styles from "./slider.module.scss";
import dummyBooks from "../../data/dummyBooks";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const booksPerPage = 5;

  const cardWidth = 206;

  const changeSlide = (direction) => {
    const maxIndex = Math.floor(dummyBooks.length / booksPerPage) - 1;
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.slider}>
      <div className={styles.fullSlider}>
        <div className={styles.arrow} onClick={() => changeSlide("left")}>
          <img src="/images/arrow.png" alt="" />
        </div>

        <div className={styles.bookViewport}>
          <div
            className={styles.bookContainer}
            style={{
              transform: `translateX(-${
                currentIndex * booksPerPage * cardWidth
              }px)`,
            }}
          >
            {dummyBooks.map((item) => (
              <BookCard key={item.id} book={item} />
            ))}
          </div>
        </div>

        <div className={styles.arrow} onClick={() => changeSlide("right")}>
          <img src="/images/arrow.png" className={styles.right} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
