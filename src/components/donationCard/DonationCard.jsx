import { useState } from "react";
import styles from "./donationCard.module.scss";

const DonationCard = ({ onModalOpen }) => {
  const [isRequested, setIsRequested] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.donationCard}>
      <div className={styles.imageContainer}>
        <img src="../../../public/images/kucuk_prens.jpeg" alt="" />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.bookInfo}>
          <div className={styles.bookName}>Küçük Prens</div>
          <div className={styles.autor}>Antoine de Saint-Exupéry</div>
        </div>

        <a href="/profile" className={styles.bookDonor}>
          Bağışçı: Semanur Özkan
        </a>
      </div>

      <div
        onClick={() => {
          setIsRequested(true);
        }}
        className={styles.donationButton}
      >
        {isRequested ? (
          <button
            onClick={() => {
              setIsModalOpen(true);
              onModalOpen();
            }}
            className={styles.disabledButton}
          >
            Talep Gönderildi
          </button>
        ) : (
          <button className={styles.requestButton}>Talep Et</button>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <span>Talebi Geri Al</span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.undoButton}
                onClick={() => {
                  setIsRequested(false);
                  handleCloseModel();
                }}
              >
                Geri al
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModel}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCard;
