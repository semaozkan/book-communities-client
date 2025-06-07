import styles from "./messageModal.module.scss";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { FaPaperclip } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import axios from "axios";
import { io } from "socket.io-client";

function formatTime(isoString) {
  // Tarih formatlama fonksiyonu
  if (!isoString) return "";
  const date = new Date(isoString);
  const now = new Date();
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();
  const pad = (n) => n.toString().padStart(2, "0");
  const time = pad(date.getHours()) + ":" + pad(date.getMinutes());
  if (isSameDay) return time;
  return `${pad(date.getDate())}.${pad(
    date.getMonth() + 1
  )}.${date.getFullYear()} ${time}`;
}

const socket = io(import.meta.env.VITE_SOCKET_CLIENT_URL); // Sunucu URL'si

const MessageModal = ({
  onClose,
  customStyle = false,
  messages = [],
  setMessages,
  currentUser,
  selectedUser,
  onUpdateLastMessage,
}) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  // const [messages, setMessages] = useState([
  //   { id: 1, senderName: "Semanur Özkan", text: "Merhaba", time: "22:14" },
  //   { id: 2, senderName: "Semanur Özkan", text: "Nasılsın?", time: "22:14" },
  //   {
  //     id: 3,
  //     senderName: "Ufuk Can KURT",
  //     text: "İyiyim, sen nasılsın?",
  //     time: "22:15",
  //   },
  //   {
  //     id: 4,
  //     senderName: "Semanur Özkan",
  //     text: "Ben de iyiyim",
  //     time: "22:16",
  //   },
  //   {
  //     id: 5,
  //     senderName: "Semanur Özkan",
  //     text: "Ben de iyiyim",
  //     time: "22:16",
  //   },
  //   {
  //     id: 6,
  //     senderName: "Semanur Özkan",
  //     text: "Ben de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyim",
  //     time: "22:16",
  //   },

  //   {
  //     id: 6,
  //     senderName: "Semanur Özkan",
  //     text: "naptın",
  //     time: "22:17",
  //   },
  //   {
  //     id: 6,
  //     senderName: "Semanur Özkan",
  //     text: "naptın",
  //     time: "22:20",
  //   },
  // ]);

  useEffect(() => {
    if (messageSectionRef.current) {
      messageSectionRef.current.scrollTop =
        messageSectionRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!selectedUser) return;
    const roomId = [currentUser._id, selectedUser._id].sort().join("-");
    socket.emit("joinRoom", roomId);
  }, [selectedUser, currentUser?._id]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      if (message.senderId === currentUser._id) return;
      setMessages((prev) => [...prev, message]);
      if (onUpdateLastMessage) {
        const roomId = [currentUser._id, selectedUser._id].sort().join("-");
        onUpdateLastMessage(roomId, message);
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [setMessages, onUpdateLastMessage, currentUser?._id, selectedUser?._id]);

  const handleSend = async () => {
    if (!messageText.trim()) return;
    const roomId = [currentUser?._id, selectedUser._id].sort().join("-");
    const newMessage = {
      roomId,
      senderId: currentUser?._id,
      text: messageText,
      time: new Date().toISOString(),
    };
    try {
      const res = await axios.post(`${FETCH}messages`, newMessage, {
        withCredentials: true,
      });
      setMessages((prev) => [...prev, res.data]);
      socket.emit("sendMessage", { roomId, message: res.data });
      setMessageText("");
      if (onUpdateLastMessage) {
        onUpdateLastMessage(roomId, res.data);
      }
    } catch (err) {
      // Hata yönetimi eklenebilir
    }
  };

  //message footer (file, emoji vs)
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const messageSectionRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null); // dosya bilgisi
  const [filePreviewUrl, setFilePreviewUrl] = useState(null); // görsel için URL

  return (
    <div
      className={
        customStyle
          ? `${styles.messageModal} ${styles.customStyle}`
          : styles.messageModal
      }
    >
      <div className={styles.header}>
        <div className={styles.receiverInfo}>
          <div className={styles.imgContainer}>
            <img
              src={selectedUser?.profilePicture || "/images/profile_photo.jpg"}
              alt=""
            />
          </div>
          <div className={styles.name}>
            {selectedUser?.fullname || selectedUser?.username}
          </div>
        </div>
        <div className={styles.close} onClick={onClose}>
          <IoClose className={styles.closeIcon} />
        </div>
      </div>

      <div className={styles.messageSection} ref={messageSectionRef}>
        {messages.map((message, index) => {
          const isMine = message.senderId === currentUser?._id;
          const prev = messages[index - 1];
          const getMinute = (t) => t?.slice(0, 16); // '2025-05-16T14:07' gibi

          const isSameSenderAndTimeAsPrevious =
            index > 0 &&
            prev.senderId === message.senderId &&
            getMinute(prev.time) === getMinute(message.time);

          const sender = isMine ? currentUser : selectedUser;

          return (
            <>
              <div
                key={message._id || message.id || index}
                className={`${styles.messageCard} ${
                  !isSameSenderAndTimeAsPrevious
                    ? styles.newGroup
                    : styles.sameGroup
                }`}
              >
                {!isSameSenderAndTimeAsPrevious && (
                  <div className={styles.userInfo}>
                    <div className={styles.imgContainer}>
                      <img
                        src={
                          sender.profilePicture || "/images/profile_photo.jpg"
                        }
                        alt=""
                      />
                    </div>

                    <div>
                      <div className={styles.user}>
                        <div className={styles.name}>
                          {sender.fullname || sender.username}
                        </div>
                        <div className={styles.time}>
                          • {formatTime(message.time)}
                        </div>
                      </div>

                      <div className={styles.message}>{message.text}</div>

                      {message.file && (
                        <div className={styles.attachedFile}>
                          {message.file.previewUrl &&
                          message.file.type.startsWith("image/") ? (
                            <img
                              src={message.file.previewUrl}
                              alt="Ek dosya"
                              className={styles.previewImage}
                            />
                          ) : (
                            <a
                              href={message.file.previewUrl}
                              download={message.file.name}
                              className={styles.fileBox}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              📄 {message.file.name} (
                              {(message.file.size / 1024).toFixed(1)} KB)
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {isSameSenderAndTimeAsPrevious && (
                  <div className={styles.messageContainer}>
                    <div className={styles.message}>{message.text}</div>
                  </div>
                )}
              </div>
            </>
          );
        })}
        {/* muhtemelen scroll için, daha sonra kontrel et */}
        <div ref={messagesEndRef} />
      </div>

      {selectedFile && (
        <div className={styles.filePreview}>
          <div className={styles.previewContent}>
            {filePreviewUrl ? (
              <img
                src={filePreviewUrl}
                alt="Önizleme"
                className={styles.previewImage}
              />
            ) : (
              <div className={styles.previewIcon}>📄</div>
            )}
            <div className={styles.fileInfo}>
              <div>{selectedFile.name}</div>
              <div>{(selectedFile.size / 1024).toFixed(1)} KB</div>
            </div>
          </div>
          <button
            className={styles.removeFileBtn}
            onClick={() => {
              setSelectedFile(null);
              setFilePreviewUrl(null);
            }}
          >
            ❌
          </button>
        </div>
      )}

      <div className={styles.textAreaWrapper}>
        <textarea
          name="message"
          id="message"
          minLength={0}
          maxLength={3000}
          placeholder="Bir mesaj yazın..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        ></textarea>
      </div>

      <div className={styles.footer}>
        <div className={styles.left}>
          <div
            className={styles.footerIcon}
            onClick={() => imageInputRef.current.click()}
          >
            <AiFillPicture className={styles.pictureIcon} />
            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                e.target.value = null;
                if (file) {
                  setSelectedFile(file);
                  setFilePreviewUrl(URL.createObjectURL(file));
                }
              }}
              style={{ display: "none" }}
            />
          </div>

          <div
            className={styles.footerIcon}
            onClick={() => fileInputRef.current.click()}
          >
            <FaPaperclip className={styles.paperclipIcon} />
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files[0];
                e.target.value = null;
                if (file) {
                  setSelectedFile(file);
                  if (file.type.startsWith("image/")) {
                    setFilePreviewUrl(URL.createObjectURL(file));
                  } else {
                    setFilePreviewUrl(null);
                  }
                }
              }}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.footerIcon}>
            <HiOutlineEmojiHappy
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div className={styles.emojiPickerWrapper}>
                <Picker
                  data={data}
                  onEmojiSelect={(emoji) => {
                    setMessageText((prev) => prev + emoji.native);
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <button
            onClick={handleSend}
            className={`
    ${messageText.trim() || selectedFile ? styles.active : styles.disabled}
  `}
            disabled={!messageText.trim() && !selectedFile}
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
