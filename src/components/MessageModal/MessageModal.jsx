import styles from "./messageModal.module.scss";
import { IoClose } from "react-icons/io5";
import { AiFillPicture } from "react-icons/ai";
import { FaPaperclip } from "react-icons/fa6";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { useState } from "react";

const MessageModal = ({ onClose }) => {
  const [messageText, setMessageText] = useState("");

  const [messages, setMessages] = useState([
    { id: 1, senderName: "Semanur Özkan", text: "Merhaba", time: "22:14" },
    { id: 2, senderName: "Semanur Özkan", text: "Nasılsın?", time: "22:14" },
    {
      id: 3,
      senderName: "Ufuk Can KURT",
      text: "İyiyim, sen nasılsın?",
      time: "22:15",
    },
    {
      id: 4,
      senderName: "Semanur Özkan",
      text: "Ben de iyiyim",
      time: "22:16",
    },
    {
      id: 5,
      senderName: "Semanur Özkan",
      text: "Ben de iyiyim",
      time: "22:16",
    },
    {
      id: 6,
      senderName: "Semanur Özkan",
      text: "Ben de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyimBen de iyiyim",
      time: "22:16",
    },

    {
      id: 6,
      senderName: "Semanur Özkan",
      text: "naptın",
      time: "22:17",
    },
    {
      id: 6,
      senderName: "Semanur Özkan",
      text: "naptın",
      time: "22:20",
    },
  ]);

  return (
    <div className={styles.messageModal}>
      <div className={styles.header}>
        <div className={styles.receiverInfo}>
          <div className={styles.imgContainer}>
            <img src="/images/profile_photo.jpg" alt="" />
          </div>
          <div className={styles.name}>Semanur Özkan</div>
        </div>
        <div className={styles.close} onClick={onClose}>
          <IoClose className={styles.closeIcon} />
        </div>
      </div>

      <div className={styles.messageSection}>
        {messages.map((message, index) => {
          const isSameSenderAndTimeAsPrevious =
            index > 0 &&
            messages[index - 1].senderName === message.senderName &&
            messages[index - 1].time === message.time;

          return (
            <>
              <div
                key={message.id}
                className={`${styles.messageCard} ${
                  !isSameSenderAndTimeAsPrevious
                    ? styles.newGroup
                    : styles.sameGroup
                }`}
              >
                {!isSameSenderAndTimeAsPrevious && (
                  <div className={styles.userInfo}>
                    <div className={styles.imgContainer}>
                      <img src="/images/profile_photo.jpg" alt="" />
                    </div>

                    <div>
                      <div className={styles.user}>
                        <div className={styles.name}>{message.senderName}</div>
                        <div className={styles.time}>• {message.time}</div>
                      </div>

                      <div className={styles.message}>{message.text}</div>
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
      </div>

      <div className={styles.textAreaWrapper}>
        <textarea
          name="message"
          id="message"
          minLength={0}
          maxLength={3000}
          placeholder="Bir mesaj yazın..."
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.footer}>
        <div className={styles.left}>
          <div className={styles.footerIcon}>
            <AiFillPicture className={styles.pictureIcon} />
          </div>

          <div className={styles.footerIcon}>
            <FaPaperclip className={styles.paperclipIcon} />
          </div>

          <div
            className={`${styles.footerIcon} ${
              messageText.trim() ? styles.active : styles.disabled
            }`}
            disabled={!messageText.trim()}
          >
            <HiOutlineEmojiHappy />
          </div>
        </div>

        <div className={styles.right}>
          <button
            className={`
              ${messageText.trim() ? styles.active : styles.disabled}`}
            disabled={!messageText.trim()}
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
