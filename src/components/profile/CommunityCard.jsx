import styles from "./communityCard.module.scss";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();
  console.log("community card:", community);
  return (
    <div className={styles.card}>
      <img
        src={community.profileImage}
        alt="topluluk"
        className={styles.image}
      />
      <div className={styles.info}>
        <div className={styles.title}>{community.name}</div>
        {community.description && (
          <div className={styles.desc}>{community.description}</div>
        )}
      </div>
      <button
        className={styles.button}
        onClick={() => navigate(`/community/${community._id}`)}
      >
        Detaya Git
      </button>
    </div>
  );
};

export default CommunityCard;
