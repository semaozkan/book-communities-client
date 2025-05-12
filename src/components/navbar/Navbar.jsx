import styles from "./navbar.module.scss";
import { FaHeart } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import { MdOutlineAccountBox } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const [user, setUser] = useState(true);

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <h1>
            <a href="/">BİBLİYOFİL</a>
          </h1>
        </div>
        <div className={styles.navCenter}>
          <li>
            <a href="/audiobooks">Sesli Kitaplar</a>
          </li>

          <li>
            <a href="/communities">Topluluklar</a>
          </li>

          <li>
            <a href="/bookDonation">Kitap Bağışı</a>
          </li>

          <li className={styles.fav}>
            <FaHeart className={styles.heart} />
            <a href="/favorites">Favorilerim</a>
          </li>
        </div>
        <div className={styles.navEnd}>
          {!user ? (
            <div>
              <button>
                <a href="/login">Giriş Yap</a>
              </button>
            </div>
          ) : (
            <div
              className={styles.user}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              <li>
                <BsThreeDots className={styles.dots} />
              </li>
              <li>
                <FaUserCircle className={styles.circle} />
              </li>
            </div>
          )}

          {isModalOpen && (
            <div className={styles.modal} ref={modalRef}>
              <div className={styles.modalItem} ref={buttonRef}>
                <MdOutlineAccountBox className={styles.accountIcon} />
                <a href="/profile">Hesabım</a>
              </div>
              <div
                className={styles.modalItem}
                ref={buttonRef}
                // onClick={handleLogout}
              >
                <IoIosLogOut className={styles.logoutIcon} />
                Çıkış Yap
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
