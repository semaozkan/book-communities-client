import { useNavigate } from "react-router-dom";
import styles from "./communityCard.module.scss";

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/community`);
  };

  return (
    <div onClick={handleCardClick} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={community.image} alt="" />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.name}>{community.name}</div>
        <div className={styles.disc}>Katılımcı Sayısı: {community.members}</div>
      </div>

      {/* <div className={styles.joinButton}>
        <button>Katıl</button>
      </div> */}
    </div>
  );
};

export default CommunityCard;
