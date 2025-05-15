import styles from "./profile.module.scss";
import { FaRegUser } from "react-icons/fa";
import { MdCameraAlt } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

const user = {
  id: 1,
  name: "Semanur Özkan",
  username: "semaozkn",
  bio: "Frontend geliştirici. Kitap kurdu. Bibliyofil gönüllüsü.",
  profileImage: "/images/profile_photo.jpg",
  backgroundImage: "../../../public/images/favorites.jpg",
  communities: [
    { id: 1, name: "Kadın Yazarlar Kulübü" },
    { id: 2, name: "Psikoloji Kitapları Topluluğu" },
  ],
  listenedBooks: [
    { id: 101, title: "Hayvanlardan Tanrılara: Sapiens" },
    { id: 102, title: "İnsan Olmak" },
  ],
  summaries: [
    { id: 201, title: "1984 Kitap Özeti" },
    { id: 202, title: "Cesur Yeni Dünya Üzerine Notlar" },
  ],
};

const Profile = () => {
  const defaultProfileImage = "/images/default_profile.png";

  const defaultBackgroundImage = "/images/about.png";

  const [isProfilePhotoModalOpen, setIsProfilePhotoModalOpen] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(user.profileImage); // Şu anki fotoğraf
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Geçici yüklenen
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedPhoto(imageUrl);
    }
  };

  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [editedBio, setEditedBio] = useState(user.bio);

  const [backgroundImage, setBackgroundImage] = useState(user.backgroundImage);
  const backgroundInputRef = useRef(null);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <img
              src={backgroundImage || defaultBackgroundImage}
              alt="backgroundImage"
            />
            <div className={styles.profilePhoto}>
              <img
                src={profilePhoto || profilePhoto}
                alt="profile"
                onClick={() => setIsProfilePhotoModalOpen(true)}
              />
            </div>

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
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setBackgroundImage(imageUrl);
                  }
                }}
              />
            </div>
          </div>

          <div className={styles.infoContainer}>
            <div className={styles.fullName}>{user.name}</div>
            <div className={styles.bio}>{bio}</div>

            <div
              className={styles.edit}
              onClick={() => setIsBioModalOpen(true)}
            >
              <MdOutlineEdit className={styles.editIcon} />
            </div>

            <div className={styles.messageButton}>
              <button>Mesaj Gönder</button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Topluluklar</h3>
          <ul>
            {user.communities.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Dinlenen Kitaplar</h3>
          <ul>
            {user.listenedBooks.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Özetler</h3>
          <ul>
            {user.summaries.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>
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
              src={selectedPhoto || profilePhoto}
              alt="profil_photo"
              className={styles.photo}
            />
            <div className={styles.modalActions}>
              <button onClick={() => fileInputRef.current.click()}>
                Fotoğrafı Değiştir
              </button>
              <button onClick={() => setSelectedPhoto(defaultProfileImage)}>
                Sil
              </button>
              <button
                onClick={() => {
                  if (selectedPhoto) {
                    setProfilePhoto(selectedPhoto); // resmi uygula
                  }
                  setIsProfilePhotoModalOpen(false);
                }}
              >
                Kaydet
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
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
              <button
                className={styles.saveButton}
                onClick={async () => {
                  // Backend'e gönderilebilir:
                  await fetch("/api/users/me", {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ bio: editedBio }),
                  });

                  setBio(editedBio);
                  setIsBioModalOpen(false);
                }}
              >
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
    </div>
  );
};

export default Profile;
