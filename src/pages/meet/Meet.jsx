import { useNavigate, useParams } from "react-router-dom";
import styles from "./meet.module.scss";
import BookCard from "../../components/bookCard/BookCard";
import AudiobookPlayer from "../audiobookPlayer/AudiobookPlayer";
import { bookData } from "./../../data/bookData";
import { useState, useEffect, useRef } from "react";
import { HiUsers } from "react-icons/hi2";
import {
  MdMessage,
  MdOutlineExitToApp,
  MdOutlineStopCircle,
} from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { io } from "socket.io-client";

const Meet = ({ userRole = "admin" }) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { meetId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const socket = useRef(null);
  const communityIdRef = useRef(null);

  const [audioBooks, setAudioBooks] = useState([]);
  const [meet, setMeet] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const [activeTab, setActiveTab] = useState("users");

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMeet = async () => {
    try {
      const response = await axios.get(`${FETCH}meetings/${meetId}`, {
        withCredentials: true,
      });
      setMeet(response.data);
      setSelectedBook(response.data.book);
      setIsAdmin(response.data.admin._id === user?.user?._id);
      communityIdRef.current = response.data.community._id;
    } catch (error) {
      console.error("Meet fetching error:", error);
    }
  };

  useEffect(() => {
    const fetchAudioBooks = async () => {
      try {
        const response = await axios.get(`${FETCH}books/audio-books`, {
          withCredentials: true,
        });
        setAudioBooks(response.data);
      } catch (error) {
        console.error("Audio books fetching error:", error);
      }
    };
    fetchAudioBooks();
    fetchMeet();
  }, []);

  useEffect(() => {
    if (!meetId) return;
    console.log("Setting up socket connection for meeting:", meetId);
    socket.current = io(import.meta.env.VITE_SOCKET_CLIENT_URL);
    socket.current.emit("joinRoom", meetId);

    socket.current.on("meeting-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.current.on("meetingEnded", () => {
      // Audio'yu durdur
      const audioElement = document.querySelector("audio");
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      // Socket bağlantısını kapat
      if (socket.current) {
        socket.current.disconnect();
      }
      // Topluluk sayfasına yönlendir
      const communityId = communityIdRef.current;
      if (communityId) {
        navigate(`/community/${communityId}`);
      } else {
        navigate("/");
      }
    });

    return () => {
      console.log("Cleaning up socket connection");
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [meetId]);

  useEffect(() => {
    if (meet?.chat) setMessages(meet.chat);
  }, [meet]);

  useEffect(() => {
    if (!socket.current) return;
    const handler = (newParticipants) => {
      setMeet((prev) => ({ ...prev, participants: newParticipants }));
    };
    socket.current.on("participantsUpdated", handler);
    return () => {
      socket.current.off("participantsUpdated", handler);
    };
  }, []);

  const isMember = userRole === "member" || userRole === "admin";
  if (!isMember) {
    return (
      <div className={styles.notAllowed}>
        Bu sayfayı görüntüleme yetkiniz yok.
        <button onClick={() => navigate("/")}>Ana Sayfaya Dön</button>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;

    const msgObj = {
      meetingId: meetId,
      message: messageText.trim(),
      sender: {
        _id: user?.user?._id,
        username: user?.user?.username,
        profilePicture: user?.user?.profilePicture,
      },
    };
    socket.current.emit("meeting-message", msgObj);
    setMessageText("");
  };

  const handleBookSelection = async (book) => {
    setSelectedBook(book);
    const res = await axios.patch(
      `${FETCH}meetings/${meetId}/select-book`,
      { bookId: book._id },
      { withCredentials: true }
    );
    fetchMeet();
  };

  const handleLeaveMeeting = async () => {
    if (isAdmin) {
      navigate(`/community/${meet.community._id}`);
    }
    const res = await axios.post(
      `${FETCH}meetings/${meetId}/leave`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      setMeet((prev) => ({
        ...prev,
        participants: prev.participants.filter(
          (p) => p._id !== user?.user?._id
        ),
      }));
      navigate(`/community/${meet.community._id}`);
      socket.current.emit("leaveMeeting", { meetingId: meetId });
    }
  };

  const handleEndMeeting = async () => {
    const res = await axios.post(
      `${FETCH}meetings/${meetId}/end`,
      {},
      { withCredentials: true }
    );
    if (res.status === 200) {
      socket.current.emit("endMeeting", { meetingId: meetId });
      navigate(`/community/${meet.community._id}`);
    }
  };

  const messageSectionRef = useRef(null);

  useEffect(() => {
    messageSectionRef.current?.scrollTo({
      top: messageSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className={styles.meetContainer}>
      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          {!selectedBook && <h2>📚 Kitap Seç</h2>}
          <div className={styles.books}>
            {meet?.book !== null ? (
              <div>
                <AudiobookPlayer
                  book={meet?.book}
                  meet={meet}
                  onClose={() => setSelectedBook(null)}
                  compact
                  pageSize={9}
                />
              </div>
            ) : (
              <div className={styles.bookList}>
                {audioBooks.map((book) => (
                  <BookCard
                    key={book._id}
                    book={book}
                    liked={false}
                    onToggleFavorite={() => {}}
                    onRemove={() => {}}
                    showDelete={false}
                    onClick={() => handleBookSelection(book)}
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
                {meet?.participants?.map((participant) => (
                  <div key={participant._id} className={styles.member}>
                    <div className={styles.image}>
                      <img
                        src={
                          participant.profilePicture ||
                          "/images/profile_photo.jpg"
                        }
                        alt={participant.fullname || participant.username}
                      />
                    </div>
                    <span>{participant.fullname || participant.username}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.chatBox}>
                <div className={styles.messages} ref={messageSectionRef}>
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={styles.message}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <strong style={{ marginRight: 4 }}>
                        {msg.sender?.fullname || msg.sender?.username || "?"}:
                      </strong>{" "}
                      {msg.message}
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
        <button className={styles.leaveButton} onClick={handleLeaveMeeting}>
          <MdOutlineExitToApp style={{ marginRight: 8, fontSize: 20 }} />
          Toplantıdan Ayrıl
        </button>
        {isAdmin && (
          <button className={styles.endButton} onClick={handleEndMeeting}>
            <MdOutlineStopCircle style={{ marginRight: 8, fontSize: 20 }} />
            Toplantıyı Sonlandır
          </button>
        )}
      </div>
    </div>
  );
};

export default Meet;
