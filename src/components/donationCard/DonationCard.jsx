import styles from "./donationCard.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DonationCard = ({ donation, onModalOpen }) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user: loggedInUser } = useAuth();
  const navigate = useNavigate();
  const [isRequested, setIsRequested] = useState(
    donation.requesters.some(
      (requester) => requester.user._id === loggedInUser.user._id
    )
  );
  const [isDonor, setIsDonor] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModel = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (id) => {
    navigate(`/bookDonation/${donation._id}`);
  };

  const handleRequest = async () => {
    try {
      await axios.post(
        `${FETCH}donations/${donation._id}/request`,
        {},
        { withCredentials: true }
      );

      setIsRequested(true);
    } catch (error) {
      console.error("Error requesting donation:", error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      await axios.delete(`${FETCH}donations/${donation._id}/request`, {
        withCredentials: true,
      });
      setIsRequested(false);
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  useEffect(() => {
    setIsRequested(
      donation.requesters.some(
        (requester) => requester.user._id === loggedInUser.user._id
      )
    );
  }, [donation.requesters, loggedInUser.user._id]);

  useEffect(() => {
    setIsDonor(donation?.donor._id === loggedInUser.user._id);
  }, [donation?.donor._id, loggedInUser.user._id]);

  return (
    <div className={styles.donationCard}>
      <div
        className={styles.imageContainer}
        onClick={handleNavigate}
        style={{ cursor: "pointer" }}
      >
        <img src={donation.book.image} alt="" />
      </div>

      <div className={styles.infoContainer} style={{ cursor: "pointer" }}>
        <div className={styles.bookInfo} onClick={handleNavigate}>
          <div className={styles.bookName}>{donation.book.title}</div>
          <div className={styles.autor}>{donation.book.author}</div>
        </div>

        <a href={`/profile/${donation.donor._id}`} className={styles.bookDonor}>
          Bağışçı : {donation.donor.fullname}
        </a>
      </div>

      {!isDonor && (
        <div
          onClick={() => {
            setIsRequested(true);
          }}
          className={styles.donationButton}
        >
          {isRequested ? (
            <button
              onClick={() => {
                setIsModalOpen(true);
                onModalOpen();
              }}
              className={styles.disabledButton}
            >
              Talep Gönderildi
            </button>
          ) : (
            <button className={styles.requestButton} onClick={handleRequest}>
              Talep Et
            </button>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <span>Talebi Geri Al</span>
            <div className={styles.buttonContainer}>
              <button
                className={styles.undoButton}
                onClick={() => {
                  setIsRequested(false);
                  handleCloseModel();
                  handleCancelRequest();
                }}
              >
                Talebi Geri Al
              </button>
              <button
                className={styles.cancelButton}
                onClick={handleCloseModel}
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

export default DonationCard;
