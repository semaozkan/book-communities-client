import { useRef, useState } from "react";
import CommunityCard from "../../components/communityCard/CommunityCard";
import styles from "./communities.module.scss";
// import { FaUsers } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const Communities = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const [communityName, setCommunityName] = useState("");
  const [declaration, setDeclaration] = useState("");

  const isFormValid =
    selectedImage && communityName.trim() !== "" && declaration !== "";

  return (
    <div className={styles.communities}>
      <div className={styles.imgContainer}>
        <img src="../../../public/images/communities.jpg" alt="" />
        <svg viewBox="0 0 1440 220" preserveAspectRatio="none">
          <path
            fill="white"
            d="M0,160L80,144C160,128,320,96,480,117.3C640,139,800,213,960,218.7C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>

        <h1>Topluluklar </h1>
      </div>

      <div
        className={styles.addButton}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        + Topluluk Oluştur{" "}
      </div>
      <div className={styles.communityContainer}>
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>

      {isModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <span>Yeni Topluluk Oluştur</span>
              <div
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedImage(null);
                }}
              >
                <IoClose className={styles.closeButton} />
              </div>
            </div>

            <div className={styles.mainContainer}>
              <div className={styles.addImage}>
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Topluluk Logosu"
                    className={styles.selectedLogo}
                  />
                ) : (
                  <div
                    onClick={handleLogoClick}
                    className={styles.imageContainer}
                  >
                    <FaPlus className={styles.imageIcon} />
                    <span>Logo Ekle</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleLogoChange}
                />
              </div>

              <form>
                <div className={styles.formRow}>
                  <label htmlFor="communityName">Topluluk İsmi:</label>
                  <input
                    type="communityName"
                    name="communityName"
                    id="communityName"
                    placeholder="Topluluk isminizi yazınız..."
                    onChange={(e) => {
                      setCommunityName(e.target.value);
                    }}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="declaration">Açıklama:</label>
                  <input
                    type="declaration"
                    name="declaration"
                    id="declaration"
                    placeholder="Topluluğunuzu tanıtacak bir kaç cümle yazın..."
                    onChange={(e) => {
                      setDeclaration(e.target.value);
                    }}
                    required
                  />
                </div>
              </form>
            </div>

            <div className={styles.footer}>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedImage(null);
                }}
                className={isFormValid ? styles.active : styles.disabled}
                disabled={!isFormValid}
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Communities;
