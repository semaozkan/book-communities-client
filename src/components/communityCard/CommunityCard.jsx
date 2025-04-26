import { useNavigate } from "react-router-dom";
import styles from "./communityCard.module.scss";

const CommunityCard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/community`);
  };

  return (
    <div onClick={handleCardClick} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src="/images/pausiber_kitap_topluluğu.png" alt="" />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.name}>Paüsiber Kitap Topluluğu</div>
        <div className={styles.disc}>Katılımcı Sayısı: 10</div>
      </div>

      <div className={styles.joinButton}>
        <button>Katıl</button>
      </div>
    </div>
  );
};

export default CommunityCard;
