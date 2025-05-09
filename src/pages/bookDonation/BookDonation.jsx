import { useRef, useState } from "react";
import DonationCard from "../../components/donationCard/DonationCard";
import styles from "./bookDonation.module.scss";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const BookDonation = () => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const handleBookClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBookChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const [bookName, setBookName] = useState("");
  const [autor, setAutor] = useState("");

  const isFormValid =
    selectedImage && bookName.trim() !== "" && autor.trim() !== "";

  return (
    <div className={styles.bookDonation}>
      <div className={styles.imgContainer}>
        <img src="../../../public/images/donationPageImage.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <h1>Kitaplar </h1>
      </div>

      <div
        className={styles.addButton}
        onClick={() => {
          setIsDonationModalOpen(true);
        }}
      >
        + Bağış Yap{" "}
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.donationBooks}>
          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />

          <DonationCard
            onModalOpen={() => {
              setIsModalOpen(true);
            }}
          />
        </div>
      </div>
      {isDonationModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <span>Bağış Yapılacak Kitap Bilgileri</span>
              <div
                onClick={() => {
                  setIsDonationModalOpen(false);
                  setSelectedImage(null);
                }}
              >
                <IoClose className={styles.closeButton} />
              </div>
            </div>

            <div className={styles.modalMainContainer}>
              <div className={styles.addImage}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Kitap Görseli"
                    className={styles.selectedLogo}
                  />
                ) : (
                  <div
                    onClick={handleBookClick}
                    className={styles.imageContainer}
                  >
                    <FaPlus className={styles.imageIcon} />
                    <span>Kitap Görseli Ekle</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleBookChange}
                />
              </div>

              <form>
                <div className={styles.formRow}>
                  <label htmlFor="bookName">Kitap Adı:</label>
                  <input
                    type="bookName"
                    name="bookName"
                    id="bookName"
                    placeholder="Kitap adını yazınız..."
                    onChange={(e) => {
                      setBookName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="autor">Yazar:</label>
                  <input
                    type="autor"
                    name="autor"
                    id="autor"
                    placeholder="Yazarın adını yazınız..."
                    onChange={(e) => {
                      setAutor(e.target.value);
                    }}
                    required
                  />
                </div>
              </form>
            </div>

            <div className={styles.footer}>
              <button
                onClick={() => {
                  setIsDonationModalOpen(false);
                  setSelectedImage(null);
                }}
                className={isFormValid ? styles.active : styles.disabled}
                disabled={!isFormValid}
              >
                Bağış Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDonation;
