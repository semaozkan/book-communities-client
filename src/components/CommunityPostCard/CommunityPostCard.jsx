import { useState } from "react";
import styles from "./communityPostCard.module.scss";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

const CommunityPostCard = ({ userRole = "admin", post, onEdit, onDelete }) => {
  const isMember = userRole === "member" || userRole === "admin";
  const isAdmin = userRole === "admin";

  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Gönderiyi silmek istediğinize emin misiniz?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Post silindikten sonra sayfadan kaldırmak istersen:
      onDelete(post.id); // parent component'e bildir
      setIsModelOpen(false);
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: editedContent }),
      });

      onEdit(post.id, editedContent); // varsa
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Düzenleme başarısız:", error);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
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
              <li
                onClick={() => {
                  setEditedContent(post.content);
                  setIsEditModalOpen(true);
                  setIsModelOpen(false);
                }}
              >
                <MdOutlineEdit className={styles.editIcon} />
                Gönderiyi Düzenle
              </li>
              <li onClick={handleDelete}>
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

      {isEditModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Gönderiyi Düzenle</h3>

            {/* Fotoğraf önizleme */}
            {selectedImage && (
              <div className={styles.previewImageContainer}>
                <img src={selectedImage} alt="Yeni fotoğraf" />
              </div>
            )}

            <label className={styles.imageUpload}>
              Yeni Fotoğraf Seç:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>

            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="Gönderinizi düzenleyin"
            />

            <div className={styles.modalActions}>
              <button onClick={handleEdit}>Kaydet</button>
              <button onClick={() => setIsEditModalOpen(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostCard;
