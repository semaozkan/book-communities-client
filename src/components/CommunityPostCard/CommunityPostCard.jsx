import { useState } from "react";
import styles from "./communityPostCard.module.scss";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const CommunityPostCard = ({ userRole = "member" }) => {
  const isMember = userRole === "member" || userRole === "admin";
  const isAdmin = userRole === "admin";

  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img src="/images/pausiber_kitap_topluluğu.png" alt="" />
          </div>
          <span>PaüSiber Kitap Topluluğu</span>
        </div>
        {isMember && (
          <div onClick={handleToggle} className={styles.right}>
            <HiOutlineDotsHorizontal className={styles.dotIcon} />
          </div>
        )}
        {isModelOpen && (
          <div className={styles.isModelOpenContainer}>
            <ul>
              <li>
                <MdOutlineEdit className={styles.editIcon} />
                Gönderiyi Düzenle
              </li>
              <li>
                <FaTrashAlt />
                Gönderiyi Sil
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.postContent}>
        <div className={styles.imgContainer}>
          <img src="../../../public/images/postImage.jpg" alt="" />
        </div>
        <div className={styles.text}>
          Herkese Merhaba, <br /> Arkadaşlarımızla birlikte şöyle bir okuma
          listesi oluşturduk. Bu listeyi takip ederek kitaplarımızı okumaya
          devam edeceğiz.
        </div>
      </div>
    </div>
  );
};

export default CommunityPostCard;
