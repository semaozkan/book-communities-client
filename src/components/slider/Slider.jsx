import { useState } from "react";
import styles from "./slider.module.scss";

const Slider = ({ items, renderItem, itemsPerPage = 5, cardWidth = 206 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeSlide = (direction) => {
    const maxIndex = Math.ceil(items.length / itemsPerPage) - 1;
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className={styles.slider}>
      <div className={styles.fullSlider}>
        <div className={styles.arrow} onClick={() => changeSlide("left")}>
          <img src="/images/arrow.png" alt="left" />
        </div>

        <div className={styles.bookViewport}>
          <div
            className={styles.bookContainer}
            style={{
              transform: `translateX(-${
                currentIndex * itemsPerPage * cardWidth
              }px)`,
            }}
          >
            {items.map((item, index) => (
              <div key={index} style={{ width: `${cardWidth}px` }}>
                {renderItem(item)}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.arrow} onClick={() => changeSlide("right")}>
          <img src="/images/arrow.png" className={styles.right} alt="right" />
        </div>
      </div>
    </div>
  );
};

export default Slider;
