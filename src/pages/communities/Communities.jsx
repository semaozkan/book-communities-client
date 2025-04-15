import CommunityCard from "../../components/communityCard/CommunityCard";
import styles from "./communities.module.scss";
// import { FaUsers } from "react-icons/fa";
// import { FaPlus } from "react-icons/fa";

const Communities = () => {
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
        <a href="">
          <div className={styles.addButton}>+ Topluluk Ekle</div>
        </a>
      </div>
      <div className={styles.comminityContainer}>
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
        <CommunityCard />
      </div>
    </div>
  );
};

export default Communities;
