import { useState, useEffect } from "react";
import styles from "./communityPostCard.module.scss";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const CommunityPostCard = ({
  post,
  community,
  setCommunity,
  setCommunityPosts,
  isAdmin,
}) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user: loggedInUser } = useAuth();

  const [isModelOpen, setIsModelOpen] = useState(false);

  const handleToggle = () => {
    setIsModelOpen(!isModelOpen);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const [selectedImage, setSelectedImage] = useState(post.image);
  const [file, setFile] = useState(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdatePost = async () => {
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
          `${FETCH}posts/${post._id}`,
          {
            image: url,
            content: editedContent,
          },
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setSelectedImage(url);
          console.log("Gönderi güncellendi:", res.data);
          setIsEditModalOpen(false);
          setCommunityPosts((prevPosts) =>
            prevPosts.map((p) => (p._id === post._id ? res.data : p))
          );
        }
      }
    } catch (error) {
      console.error("Gönderi güncellenirken hata oluştu:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${FETCH}posts/${post?._id}`, {
        withCredentials: true,
      });

      setCommunityPosts((prevPosts) =>
        prevPosts.filter((p) => p._id !== post._id)
      );

      setIsModelOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setIsLiked(post?.likes?.includes(loggedInUser?.user?._id));
    setLikeCount(post?.likes?.length);
  }, [post]);

  const toggleLike = async () => {
    const res = await axios.post(
      `${FETCH}posts/${post._id}/like`,
      {
        userId: loggedInUser?.user?._id,
      },
      { withCredentials: true }
    );
    if (res.status === 200) {
      setIsLiked(!isLiked);
      setLikeCount(res.data?.likes?.length);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img src={community.profileImage} alt="profile_image" />
          </div>
          <span>{community.name}</span>
        </div>
        {isAdmin && (
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
              <li onClick={handleDeletePost}>
                <FaTrashAlt />
                Gönderiyi Sil
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className={styles.postContent}>
        {post.image && (
          <div className={styles.imgContainer}>
            <img src={post.image} alt="post_image" />
          </div>
        )}

        <div className={styles.text}>{post.content}</div>
      </div>
      <div className={styles.postFooter}>
        <div className={styles.likeContainer}>
          <div onClick={toggleLike}>
            {isLiked ? (
              <FaHeart className={styles.likeIcon} />
            ) : (
              <FaRegHeart className={styles.likeIcon} />
            )}
          </div>
          <div className={styles.counter}>{likeCount}</div>
        </div>
        <div className={styles.commentContainer}>
          <FaRegCommentDots className={styles.commentIcon} />
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
              <button onClick={handleUpdatePost}>Kaydet</button>
              <button onClick={() => setIsEditModalOpen(false)}>İptal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityPostCard;
