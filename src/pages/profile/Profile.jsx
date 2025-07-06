import styles from "./profile.module.scss";
import { FaRegUser } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

// import BookCard from "../../components/profile/BookCard";
import SummaryCard from "../../components/profile/SummaryCard";
import CommunityCard from "../../components/profile/CommunityCard";
import DonationCard from "../../components/profile/DonationCard";
import MessageModal from "../../components/MessageModal/MessageModal";

const Profile = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { userId } = useParams();
  const { user: loggedInUser, login } = useAuth();

  const defaultProfileImage = "/images/default_profile.png";

  const [isLoggedUser, setIsLoggedUser] = useState(
    userId === loggedInUser?.user._id
  );
  const [currentUser, setCurrentUser] = useState(null);
  const [userCommunities, setUserCommunities] = useState(null);
  const [userSummaries, setUserSummaries] = useState(null);
  const [userListenedBooks, setUserListenedBooks] = useState(null);
  const [userDonations, setUserDonations] = useState(null);

  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`${FETCH}auth/${userId}`);
      const data = await response.json();
      setCurrentUser(data);
    };
    const fetchUserDonations = async () => {
      const response = await axios.get(`${FETCH}donations/user/${userId}`, {
        withCredentials: true,
      });
      setUserDonations(response.data);
    };
    const fetchUserCommunities = async () => {
      const response = await axios.get(`${FETCH}auth/${userId}/communities`, {
        withCredentials: true,
      });
      setUserCommunities(response.data);
    };
    const fetchUserSummaries = async () => {
      const response = await axios.get(
        `${FETCH}books/user/${userId}/summaries`,
        { withCredentials: true }
      );
      setUserSummaries(response.data);
    };
    const fetchUserListenedBooks = async () => {
      const response = await axios.get(`${FETCH}books/user/${userId}`, {
        withCredentials: true,
      });
      setUserListenedBooks(response.data);
    };

    const roomId = [loggedInUser.user._id, userId].sort().join("-");

    const fetchUserMessages = async () => {
      axios
        .get(`${FETCH}messages/room/${roomId}`, { withCredentials: true })
        .then((res) => {
          console.log("Mesajlar:", res.data);
          setMessages(Array.isArray(res.data) ? res.data : []);
        });
    };

    fetchUser();
    fetchUserDonations();
    fetchUserCommunities();
    fetchUserSummaries();
    fetchUserListenedBooks();
    fetchUserMessages();
  }, [userId]);

  const [isProfilePhotoModalOpen, setIsProfilePhotoModalOpen] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(currentUser?.profilePicture); // Şu anki fotoğraf
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Geçici yüklenen
  const fileInputRef = useRef(null);

  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [bio, setBio] = useState(currentUser?.bio);
  const [editedBio, setEditedBio] = useState(currentUser?.bio);

  const [backgroundImage, setBackgroundImage] = useState(
    currentUser?.coverImage
  );
  const backgroundInputRef = useRef(null);

  const tabList = [
    { key: "genel", label: "Genel Bilgiler" },
    { key: "bagislanan", label: "Bağışlanan Kitaplar" },
    { key: "alinan", label: "Alınan Kitaplar" },
  ];

  const [activeTab, setActiveTab] = useState("genel");
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const idx = tabList.findIndex((tab) => tab.key === activeTab);
    if (tabRefs.current[idx]) {
      const node = tabRefs.current[idx];
      setUnderlineStyle({
        left: node.offsetLeft,
        width: node.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleUpdateBio = async () => {
    try {
      const response = await axios.put(
        `${FETCH}auth/profile`,
        {
          bio: editedBio,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Bio güncellendi:", response.data);
      setCurrentUser({
        ...currentUser,
        bio: editedBio,
      });
      setBio(editedBio);
      setIsBioModalOpen(false);
    } catch (error) {
      console.error("Bio güncellenirken hata oluştu:", error);
    }
  };

  const handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateProfilePhoto = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        `${FETCH}image-uploader/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { url } = response.data;
        const res = await axios.put(
          `${FETCH}auth/profile`,
          {
            profilePicture: url,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setSelectedPhoto(url);
          console.log("Profil fotoğrafı güncellendi:", response.data);
          setCurrentUser({
            ...currentUser,
            profilePicture: url,
          });
          const updatedUser = res.data;
          login({ user: updatedUser });
          setIsProfilePhotoModalOpen(false);
        }
      }
    } catch (error) {
      console.error("Profil fotoğrafı güncellenirken hata oluştu:", error);
    }
  };

  const handleBackgroundChange = async (e) => {
    const bg = e.target.files[0];
    e.preventDefault();
    if (!bg) return;
    const formData = new FormData();
    formData.append("file", bg);
    try {
      const response = await axios.post(
        `${FETCH}image-uploader/upload`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { url } = response.data;
        const res = await axios.put(
          `${FETCH}auth/profile`,
          {
            coverImage: url,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setSelectedPhoto(url);
          console.log("Profil fotoğrafı güncellendi:", response.data);
          setCurrentUser({
            ...currentUser,
            coverImage: url,
          });
          const updatedUser = res.data;
          login({ user: updatedUser });
        }
      }
    } catch (error) {
      console.error("Profil fotoğrafı güncellenirken hata oluştu:", error);
    }
  };

  console.log("currentUser:", currentUser);
  console.log("userDonations:", userDonations);
  console.log("userCommunities:", userCommunities);
  console.log("userSummaries:", userSummaries);
  console.log("userListenedBooks:", userListenedBooks);
  console.log("loggedInUser:", loggedInUser);
  console.log("isLoggedUser:", isLoggedUser);
  console.log("messages:", messages);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <img src={currentUser?.coverImage} alt="backgroundImage" />
            <div className={styles.profilePhoto}>
              <img
                src={currentUser?.profilePicture}
                alt="profile"
                onClick={() => setIsProfilePhotoModalOpen(true)}
              />
            </div>

            {isLoggedUser && (
              <div
                className={styles.photoDrapdown}
                onClick={() => backgroundInputRef.current.click()}
              >
                <MdCameraAlt className={styles.cameraIcon} />

                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={backgroundInputRef}
                  onChange={handleBackgroundChange}
                />
              </div>
            )}
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.fullName}>{currentUser?.fullname}</div>
            <div className={styles.bio}>{currentUser?.bio}</div>

            {isLoggedUser && (
              <div
                className={styles.edit}
                onClick={() => setIsBioModalOpen(true)}
              >
                <MdOutlineEdit className={styles.editIcon} />
              </div>
            )}

            {!isLoggedUser && (
              <div className={styles.messageButton}>
                <button onClick={() => setMessageModalOpen(true)}>
                  Mesaj Gönder
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.tabWrapper}>
          {tabList.map((tab, idx) => (
            <button
              key={tab.key}
              ref={(el) => (tabRefs.current[idx] = el)}
              className={
                activeTab === tab.key
                  ? `${styles.tabButton} ${styles.tabButtonActive}`
                  : styles.tabButton
              }
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
          <div
            className={styles.tabUnderline}
            style={{ left: underlineStyle.left, width: underlineStyle.width }}
          />
        </div>

        {activeTab === "genel" && (
          <>
            <div className={styles.section}>
              <h3>Topluluklar</h3>
              <ul>
                {userCommunities?.length === 0 ? (
                  <div className={styles.emptyInfo}>Henüz topluluk yok.</div>
                ) : (
                  userCommunities?.map((c) => (
                    <CommunityCard key={c.id} community={c} />
                  ))
                )}
              </ul>
            </div>

            {/*  <div className={styles.section}>
              <h3>Dinlenen Kitaplar</h3>
              <ul>
                {userListenedBooks?.length === 0 ? (
                  <div className={styles.emptyInfo}>Henüz dinlenen kitap yok.</div>
                ) : (
                  userListenedBooks?.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                )}
              </ul>
            </div>*/}
            <div className={styles.section}>
              <h3>Özetler</h3>
              <ul>
                {userSummaries?.length === 0 ? (
                  <div className={styles.emptyInfo}>Henüz özet yok.</div>
                ) : (
                  userSummaries?.map((s) => (
                    <SummaryCard key={s.id} summary={s} />
                  ))
                )}
              </ul>
            </div>
          </>
        )}
        {activeTab === "bagislanan" && (
          <div className={styles.section}>
            <h3>Bağışlanmayı Bekleyen Kitaplar</h3>
            {userDonations?.pendingDonations?.length === 0 ? (
              <div className={styles.emptyInfo}>
                Henüz bağışlanmayı bekleyen kitap yok.
              </div>
            ) : (
              <div className={styles.bookList}>
                {userDonations?.pendingDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
            <h3 style={{ marginTop: "32px" }}>Bağışlanan Kitaplar</h3>
            {userDonations?.completedDonations?.length === 0 ? (
              <div className={styles.emptyInfo}>
                Henüz bağışlanan kitap yok.
              </div>
            ) : (
              <div className={styles.bookList}>
                {userDonations?.completedDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
            <h3 style={{ marginTop: "32px" }}>İptal Edilen Bağışlar</h3>
            {userDonations?.cancelledDonations?.length === 0 ? (
              <div className={styles.emptyInfo}>
                Henüz iptal edilen bağış yok.
              </div>
            ) : (
              <div className={styles.bookList}>
                {userDonations?.cancelledDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "alinan" && (
          <div className={styles.section}>
            <h3>Talep Edilen Kitaplar</h3>
            {userDonations?.requestedDonations?.length === 0 ? (
              <div className={styles.emptyInfo}>
                Henüz talep edilen kitap yok.
              </div>
            ) : (
              <div className={styles.bookList}>
                {userDonations?.requestedDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
            <h3 style={{ marginTop: "32px" }}>Alınan Kitaplar</h3>
            {userDonations?.receivedDonations?.length === 0 ? (
              <div className={styles.emptyInfo}>Henüz alınan kitap yok.</div>
            ) : (
              <div className={styles.bookList}>
                {userDonations?.receivedDonations.map((donation) => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {isProfilePhotoModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => {
            setIsProfilePhotoModalOpen(false);
            setSelectedPhoto(null);
          }}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <div className={styles.closeButton}>
                <IoClose
                  className={styles.closeIcon}
                  onClick={() => {
                    setIsProfilePhotoModalOpen(false);
                    setSelectedPhoto(null);
                  }}
                />
              </div>
            </div>
            <img
              src={selectedPhoto || currentUser?.profilePicture}
              alt="profil_photo"
              className={styles.photo}
            />
            <div className={styles.modalActions}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handlePhotoChange}
              />
              <button onClick={() => setSelectedPhoto(defaultProfileImage)}>
                Sil
              </button>
              <button onClick={handleUpdateProfilePhoto}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {isBioModalOpen && (
        <div
          className={styles.modalContainer}
          onClick={() => {
            setIsBioModalOpen(false);
            setEditedBio(bio); // değişiklik yapılmadıysa geri al
          }}
        >
          <div
            className={styles.bioModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Bio'yu Güncelle</h3>
              <IoClose
                className={styles.close}
                onClick={() => {
                  setIsBioModalOpen(false);
                  setEditedBio(bio);
                }}
              />
            </div>

            <div className={styles.centerContainer}>
              <textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                className={styles.bioInput}
                placeholder="Kendinizden bahsedin..."
              />
            </div>

            <div className={styles.bioModalActions}>
              <button className={styles.saveButton} onClick={handleUpdateBio}>
                Kaydet
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setEditedBio(bio);
                  setIsBioModalOpen(false);
                }}
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={styles.messageModal}>
        {messageModalOpen && (
          <MessageModal
            onClose={() => {
              setMessageModalOpen(false);
            }}
            messages={messages}
            setMessages={setMessages}
            currentUser={loggedInUser.user}
            selectedUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
