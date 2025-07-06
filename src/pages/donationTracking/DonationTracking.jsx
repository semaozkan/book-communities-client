import React, { useState, useEffect } from "react";
import styles from "./donationTracking.module.scss";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DonationTracking() {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const navigate = useNavigate();
  const { donationId } = useParams();
  const { user: loggedInUser } = useAuth();

  const [donation, setDonation] = useState(null);
  const [isDonor, setIsDonor] = useState(false);
  const [winner, setWinner] = useState(null);
  const [status, setStatus] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmApplicant, setConfirmApplicant] = useState(null);
  const [selectedRequesterForMessages, setSelectedRequesterForMessages] =
    useState(null);

  const statusMap = {
    pending: { label: "Beklemede", color: "#ffb300", bg: "#fff8e1" },
    completed: { label: "Tamamlandı", color: "#388e3c", bg: "#e8f5e9" },
    cancelled: { label: "İptal Edildi", color: "#d32f2f", bg: "#fff0f0" },
  };

  const [messages, setMessages] = useState([
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
    { from: "me", text: "Merhaba, kitabı ne zaman göndereceksiniz?" },
    { from: "other", text: "Hafta sonu kargoya vereceğim." },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const res = axios
      .get(`${FETCH}donations/${donationId}`, { withCredentials: true })
      .then((res) => {
        setDonation(res.data);
      });
  }, []);

  const handleSelectRequester = (id) => {
    console.log(" accept id:", id);
    setConfirmApplicant(donation?.requesters.find((a) => a.user._id === id));
    setModalOpen(true);
  };

  const handleAcceptDonation = (id) => {
    try {
      const res = axios.put(
        `${FETCH}donations/${donationId}/complete`,
        { selectedRequesterId: id },
        { withCredentials: true }
      );
      setStatus("completed");
      setModalOpen(false);
      setConfirmApplicant(null);
    } catch (error) {
      console.log("handleAcceptDonation error:", error);
    }
  };

  const handleCancelDonation = () => {
    try {
      const res = axios.put(
        `${FETCH}donations/${donationId}/cancel`,
        {},
        { withCredentials: true }
      );
      setStatus("cancelled");
      setDonation((prev) => ({ ...prev, status: "cancelled" }));
    } catch (error) {
      console.log("handleCancelDonation error:", error);
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "me", text: input }]);
      setInput("");
    }
  };

  const handleNavigateToProfile = (id) => {
    navigate(`/profile/${id}`);
    setSelectedRequesterForMessages(a); // after that, we'll use that.
  };

  useEffect(() => {
    setIsDonor(donation?.donor._id === loggedInUser.user._id);
    setWinner(donation?.requesters.find((a) => a.status === "accepted"));
    setStatus(donation?.status);
  }, [donation]);

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.applicantsSection}>
            <div className={styles.sectionTitle}>Talep Edenler</div>
            {donation?.requesters.length > 0 ? (
              <ul className={styles.applicantList}>
                {donation?.requesters.map((a) => (
                  <li
                    key={a.user._id}
                    onClick={() => handleNavigateToProfile(a.user._id)}
                    style={{
                      backgroundColor:
                        winner?.user._id === a.user._id
                          ? "#e8f5e9"
                          : "transparent",
                    }}
                  >
                    <img
                      src={a.user.profilePicture}
                      alt={a.user.fullname}
                      className={styles.applicantImage}
                    />
                    <span>{a.user.fullname}</span>
                    {donation.status === "pending" &&
                      donation?.donor._id === loggedInUser.user._id && (
                        <button
                          className={styles.selectBtn}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRequester(a.user._id);
                          }}
                        >
                          Seç
                        </button>
                      )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className={styles.noApplicants}>Henüz talep eden yok.</div>
            )}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <img
              src={donation?.book?.image}
              alt="kitap"
              className={styles.bookImage}
            />
            <div className={styles.bookInfo}>
              <div className={styles.bookTitle}>{donation?.book?.title}</div>
              <div className={styles.bookAuthor}>{donation?.book?.author}</div>
            </div>
            <div
              className={styles.donorInfo}
              onClick={() => handleNavigateToProfile(donation?.donor._id)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={donation?.donor?.profilePicture}
                alt="donor"
                className={styles.donorImage}
              />
              <div className={styles.donorName}>
                {donation?.donor?.fullname}
              </div>
            </div>
            <div
              className={styles.statusLabel}
              style={{
                color: statusMap[status]?.color,
                background: statusMap[status]?.bg,
                border: `1.5px solid ${statusMap[status]?.color}`,
              }}
            >
              {statusMap[status]?.label}
              {donation?.status === "pending" && isDonor && (
                <button
                  className={styles.settingsBtn}
                  onClick={() => setModalOpen(true)}
                  style={{ marginLeft: 12 }}
                >
                  <IoEllipsisHorizontal size={24} />
                </button>
              )}
            </div>
            {modalOpen && confirmApplicant && (
              <div
                className={styles.modalOverlay}
                onClick={() => {
                  setModalOpen(false);
                  setConfirmApplicant(null);
                }}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    style={{ fontWeight: 600, fontSize: 18, marginBottom: 18 }}
                  >
                    {confirmApplicant.user.fullname}'ı seçmek istediğinizden
                    emin misiniz?
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className={styles.modalActionBtn}
                      style={{ background: "#388e3c" }}
                      onClick={() => {
                        handleAcceptDonation(confirmApplicant.user._id);
                        setStatus("completed");
                        setModalOpen(false);
                        setConfirmApplicant(null);
                      }}
                    >
                      Evet
                    </button>
                    <button
                      className={styles.modalActionBtn + " " + styles.cancel}
                      onClick={() => {
                        setModalOpen(false);
                        setConfirmApplicant(null);
                      }}
                    >
                      Hayır
                    </button>
                  </div>
                </div>
              </div>
            )}
            {modalOpen && !confirmApplicant && (
              <div
                className={styles.modalOverlay}
                onClick={() => setModalOpen(false)}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className={styles.modalActionBtn}
                    style={{
                      background: "#fff",
                      color: "#d32f2f",
                      border: "1.5px solid #d32f2f",
                    }}
                    onClick={() => {
                      setStatus("cancelled");
                      setModalOpen(false);
                      handleCancelDonation();
                    }}
                  >
                    Bağışı İptal Et
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className={styles.messageSection}>
            <div className={styles.sectionTitle}>
              {selectedRequesterForMessages?.user?.fullname} ile Mesajlaşma
            </div>
            <div className={styles.messages}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.from === "me" ? styles.myMsg : styles.otherMsg}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className={styles.inputArea}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mesaj yaz..."
              />
              <button onClick={handleSend}>Gönder</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
