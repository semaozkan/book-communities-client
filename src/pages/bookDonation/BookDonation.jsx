import { useRef, useState, useEffect } from "react";
import DonationCard from "../../components/donationCard/DonationCard";
import styles from "./bookDonation.module.scss";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Search from "../../components/search/Search";
import axios from "axios";

const BookDonation = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const [donations, setDonations] = useState([]);

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const [bookName, setBookName] = useState("");
  const [autor, setAutor] = useState("");
  const [file, setFile] = useState(null);

  const isFormValid =
    selectedImage && bookName.trim() !== "" && autor.trim() !== "";

  useEffect(() => {
    axios.get(`${FETCH}donations`, { withCredentials: true }).then((res) => {
      setDonations(res.data);
    });
  }, []);

  const handleBookClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBookChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleDonationSubmit = async () => {
    if (!isFormValid || !file) return;
    const donationData = {
      book: {
        title: bookName,
        author: autor,
        image: selectedImage,
      },
    };

    try {
      const formData = new FormData();
      formData.append("file", file);

      const imageRes = await axios.post(
        `${FETCH}image-uploader/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (imageRes.status === 200) {
        const { url } = imageRes.data;
        donationData.book.image = url;

        const res = await axios.post(`${FETCH}donations`, donationData, {
          withCredentials: true,
        });

        // Yeni donation'u mevcut listeye ekle
        setDonations((prev) => [res.data, ...prev]);

        setIsDonationModalOpen(false);
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const filteredDonations = donations.filter((donation) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      (donation.book.title && donation.book.title.toLowerCase().includes(q)) ||
      (donation.book.author &&
        donation.book.author.toLowerCase().includes(q)) ||
      (donation.book.description &&
        donation.book.description.toLowerCase().includes(q))
    );
  });

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

      <div className={styles.searchContainer} style={{ width: "500px" }}>
        <Search
          simple={true}
          dropdown={false}
          placeholder="Kitap adı veya yazar ile ara"
          onChange={setSearchTerm}
        />
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.donationBooks}>
          {filteredDonations
            .filter((donation) => donation.status !== "cancelled")
            .map((donation) => (
              <DonationCard
                key={donation._id}
                donation={donation}
                onModalOpen={() => {
                  setIsModalOpen(true);
                }}
              />
            ))}
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
                onClick={handleDonationSubmit}
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
