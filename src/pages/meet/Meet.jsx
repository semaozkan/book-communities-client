import { useNavigate, useParams } from "react-router-dom";
import styles from "./meet.module.scss";
import BookCard from "../../components/bookCard/BookCard";
import AudiobookPlayer from "../audiobookPlayer/AudiobookPlayer";
import { bookData } from "./../../data/bookData";
import { useState } from "react";
import { HiUsers } from "react-icons/hi2";
import { MdMessage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const Meet = ({ userRole = "admin" }) => {
  const { communityId } = useParams();
  const navigate = useNavigate();

  const isMember = userRole === "member" || userRole === "admin";
  if (!isMember) {
    return (
      <div className={styles.notAllowed}>
        Bu sayfayı görüntüleme yetkiniz yok.
        <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  const [selectedBook, setSelectedBook] = useState(null);

  const [activeTab, setActiveTab] = useState("users");

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    // Mesajı mesajlar listesine ekle
    setMessages((prev) => [
      ...prev,
      { sender: "Sen", text: messageText.trim() },
    ]);

    // Input'u temizle
    setMessageText("");
  };

  return (
    <div className={styles.meetContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          {!selectedBook && <h2>📚 Kitap Seç</h2>}
          <div className={styles.books}>
            {selectedBook ? (
              <div>
                <AudiobookPlayer
                  book={selectedBook}
                  onClose={() => setSelectedBook(null)}
                  compact
                  pageSize={9}
                />
              </div>
            ) : (
              <div className={styles.bookList}>
                {bookData.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    liked={false}
                    onToggleFavorite={() => {}}
                    onRemove={() => {}}
                    showDelete={false}
                    onClick={() => setSelectedBook(book)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div>
            <h3 className={styles.rightTitle}>
              {activeTab === "users" ? "👥 Katılımcılar" : "💬 Sohbet"}
            </h3>

            {activeTab === "users" ? (
              <div className={styles.members}>
                <div className={styles.member}>
                  <div className={styles.image}>
                    <img
                      src="../../../public/images/profile_photo.jpg"
                      alt=""
                    />
                  </div>
                  <span>Semanur Özkan</span>
                </div>

                <div className={styles.member}>
                  <div className={styles.image}>
                    <img
                      src="../../../public/images/profile_photo.jpg"
                      alt=""
                    />
                  </div>
                  <span>Semanur Özkan</span>
                </div>

                <div className={styles.member}>
                  <div className={styles.image}>
                    <img
                      src="../../../public/images/profile_photo.jpg"
                      alt=""
                    />
                  </div>
                  <span>Semanur Özkan</span>
                </div>
              </div>
            ) : (
              <div className={styles.chatBox}>
                <div className={styles.messages}>
                  {/* <div className={styles.message}>
                    <strong>Sen:</strong> Merhaba!
                  </div>
                  <div className={styles.message}>
                    <strong>Diğer:</strong> Hoş geldin!
                  </div> */}

                  {messages.map((msg, index) => (
                    <div key={index} className={styles.message}>
                      <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                  ))}
                </div>
                <div className={styles.inputField}>
                  <div className={styles.inputWrapper}>
                    <input
                      name="message"
                      id="message"
                      value={messageText}
                      minLength={0}
                      maxLength={3000}
                      placeholder="Bir mesaj yazın..."
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                    ></input>
                    <IoMdSend
                      className={styles.sendIcon}
                      onClick={handleSendMessage}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.tabButtons}>
            <button
              className={activeTab === "users" ? styles.active : ""}
              onClick={() => setActiveTab("users")}
            >
              <HiUsers className={styles.usersIcon} />
            </button>
            <button
              className={activeTab === "chat" ? styles.active : ""}
              onClick={() => setActiveTab("chat")}
            >
              <MdMessage className={styles.messageIcon} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button
          className={styles.leaveButton}
          onClick={() => navigate("/community")}
        >
          Toplantıdan Ayrıl
        </button>
      </div>
    </div>
  );
};

export default Meet;
