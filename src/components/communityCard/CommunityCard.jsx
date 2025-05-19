import { useNavigate } from "react-router-dom";
import styles from "./communityCard.module.scss";

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/community/${community._id}`);
  };

  return (
    <div onClick={handleCardClick} className={styles.container}>
      <div className={styles.imgContainer}>
        <img src={community?.profileImage} alt="profile_Image" />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.name}>{community?.name}</div>
        <div className={styles.disc}>
          Katılımcı Sayısı: {community?.members.length}
        </div>
      </div>

      {/* <div className={styles.joinButton}>
        <button>Katıl</button>
      </div> */}
    </div>
  );
};

export default CommunityCard;
