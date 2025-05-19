import styles from "./donationCard.module.scss";
import { useNavigate } from "react-router-dom";

const DonationCard = ({ donation }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <img src={donation.book.image} alt="kitap" className={styles.image} />
      <div className={styles.info}>
        <div className={styles.title}>{donation.book.title}</div>
        <div className={styles.author}>{donation.book.author}</div>
      </div>
      <button
        className={styles.button}
        onClick={() => navigate(`/bookDonation/${donation._id}`)}
      >
        Detaya Git
      </button>
    </div>
  );
};

export default DonationCard;
