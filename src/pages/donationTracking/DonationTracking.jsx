import React, { useState } from "react";
import styles from "./donationTracking.module.scss";
import { IoEllipsisHorizontal } from "react-icons/io5";

const dummyBook = {
  image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200",
  title: "Suç ve Ceza",
  author: "Fyodor Dostoyevski",
};
const donor = {
  name: "Semanur Özkan",
  image: "https://randomuser.me/api/portraits/women/44.jpg",
};
const applicants = [
  {
    id: 1,
    name: "Ali Yılmaz",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Ayşe Demir",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 3,
    name: "Mehmet Kaya",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

export default function DonationTracking() {
  const [status, setStatus] = useState("pending");
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmApplicant, setConfirmApplicant] = useState(null);
  const statusMap = {
    pending: { label: "Beklemede", color: "#ffb300", bg: "#fff8e1" },
    completed: { label: "Tamamlandı", color: "#388e3c", bg: "#e8f5e9" },
    cancelled: { label: "İptal Edildi", color: "#d32f2f", bg: "#fff0f0" },
  };
  const [selectedApplicant, setSelectedApplicant] = useState(applicants[0]);
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
  const [applicantStatus, setApplicantStatus] = useState({
    1: "pending",
    2: "pending",
    3: "pending",
  });

  const handleSelectApplicant = (id) => {
    setConfirmApplicant(applicants.find((a) => a.id === id));
    setModalOpen(true);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "me", text: input }]);
      setInput("");
    }
  };

  return (
    <div className={styles.trackingContainer}>
      <div className={styles.body}>
        <div className={styles.left}>
          <div className={styles.applicantsSection}>
            <div className={styles.sectionTitle}>Talep Edenler</div>
            <ul className={styles.applicantList}>
              {applicants.map((a) => (
                <li
                  key={a.id}
                  className={
                    selectedApplicant.id === a.id
                      ? styles.selectedApplicant
                      : ""
                  }
                  onClick={() => setSelectedApplicant(a)}
                >
                  <img
                    src={a.image}
                    alt={a.name}
                    className={styles.applicantImage}
                  />
                  <span>{a.name}</span>
                  <button
                    className={styles.selectBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectApplicant(a.id);
                    }}
                    disabled={applicantStatus[a.id] === "accepted"}
                    style={{
                      display: status === "completed" ? "none" : "inline-flex",
                    }}
                  >
                    {applicantStatus[a.id] === "accepted" ? "Seçildi" : "Seç"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            <img
              src={dummyBook.image}
              alt="kitap"
              className={styles.bookImage}
            />
            <div className={styles.bookInfo}>
              <div className={styles.bookTitle}>{dummyBook.title}</div>
              <div className={styles.bookAuthor}>{dummyBook.author}</div>
            </div>
            <div className={styles.donorInfo}>
              <img
                src={donor.image}
                alt="donor"
                className={styles.donorImage}
              />
              <div className={styles.donorName}>{donor.name}</div>
            </div>
            <div
              className={styles.statusLabel}
              style={{
                color: statusMap[status].color,
                background: statusMap[status].bg,
                border: `1.5px solid ${statusMap[status].color}`,
              }}
            >
              {statusMap[status].label}
              {status === "pending" && (
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
                    {confirmApplicant.name}'ı seçmek istediğinizden emin
                    misiniz?
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
                        const newStatus = {};
                        applicants.forEach((a) => {
                          newStatus[a.id] =
                            a.id === confirmApplicant.id
                              ? "completed"
                              : "pending";
                        });
                        setApplicantStatus(newStatus);
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
              {selectedApplicant.name} ile Mesajlaşma
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
