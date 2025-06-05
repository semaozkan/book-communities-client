import { useState } from "react";
import styles from "./settings.module.scss";
import { FaUserLarge } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Settings = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  const [isActiveName, setIsActiveName] = useState(false);
  const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePhone, setIsActivePhone] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [responseText, setResponseText] = useState({
    text: "",
    color: "",
    status: "",
  });

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleVisibleName = (e) => {
    if (isActiveName === false) {
      setIsActiveName(true);
    } else {
      setIsActiveName(false);
    }
  };

  const handleVisibleUsername = (e) => {
    if (isActiveUsername === false) {
      setIsActiveUsername(true);
    } else {
      setIsActiveUsername(false);
    }
  };

  const handleVisibleMail = (e) => {
    if (isActiveMail === false) {
      setIsActiveMail(true);
    } else {
      setIsActiveMail(false);
    }
  };

  const handleVisiblePhone = (e) => {
    if (isActivePhone === false) {
      setIsActivePhone(true);
    } else {
      setIsActivePhone(false);
    }
  };

  const handleVisiblePassword = (e) => {
    if (isActivePassword === false) {
      setIsActivePassword(true);
    } else {
      setIsActivePassword(false);
    }
  };

  const handleSubmitName = async () => {
    try {
      const response = await axios.put(
        `${FETCH}auth/profile`,
        {
          fullname: `${name} ${surname}`,
        },
        {
          withCredentials: true,
        }
      );
      setShowResponseMessage(true);
      setResponseText({
        text: "Adınız ve soyadınız başarıyla güncellendi.",
        color: "green",
        status: "success",
      });
      setTimeout(() => {
        setShowResponseMessage(false);
        setIsActiveName(false);
      }, 5000);

      if (response.status === 200) {
        const updatedUser = response.data;
        login({ user: updatedUser });
      }
    } catch (error) {
      console.error("Error updating name:", error);
      setShowResponseMessage(true);
      setResponseText({
        text: error.response.data.message,
        color: "red",
        status: "error",
      });
      setTimeout(() => {
        setShowResponseMessage(false);
      }, 5000);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await axios.put(
        `${FETCH}auth/change-password`,
        {
          currentPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      setShowResponseMessage(true);
      setResponseText({
        text: response.data.message,
        color: "green",
        status: "success",
      });
      setTimeout(() => {
        setShowResponseMessage(false);
        setIsActivePassword(false);
      }, 5000);

      if (response.status === 200) {
        console.log("update pass:", response.data);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setShowResponseMessage(true);
      setResponseText({
        text: error.response.data.message,
        color: "red",
        status: "error",
      });
      setTimeout(() => {
        setShowResponseMessage(false);
      }, 5000);
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.sideBar}>
        <div className={styles.header}>Ayarlar</div>
        <div className={styles.itemContainer}>
          <div
            className={`${styles.item} ${
              activeTab === "personal" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("personal")}
          >
            <FaUserLarge />
            <span>Kişisel Bilgiler</span>
          </div>

          {/* <div
            className={`${styles.item} ${
              activeTab === "favorites" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <FaUserLarge />
            <span>Favoriler</span>
          </div>*/}
        </div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.mainContent}>
          {activeTab === "personal" && (
            <div className={styles.personalInfo}>
              <div className={styles.title}>Kişisel Bilgiler</div>
              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>Ad Soyad</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisibleName}
                  >
                    {isActiveName ? `İptal Et` : `Düzenle`}
                  </button>
                </div>

                {isActiveName ? (
                  <div className={styles.editContainer}>
                    <div className={styles.content}>
                      Resmî kimliğinizdeki adla eşleşmesine dikkat edin.
                    </div>
                    <div className={styles.inputContainer}>
                      <div className={styles.inputContent}>
                        <div className={styles.userName}>Ad</div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>

                      <div className={styles.inputContent}>
                        <div className={styles.userName}>Soyad</div>
                        <input
                          type="text"
                          value={surname}
                          onChange={(e) => setSurname(e.target.value)}
                        />
                      </div>
                    </div>
                    {showResponseMessage && (
                      <div
                        style={{ color: responseText.color, marginBottom: 24 }}
                      >
                        {responseText.text}
                      </div>
                    )}
                    <div
                      className={styles.saveButton}
                      onClick={handleSubmitName}
                    >
                      Kaydedin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>{user.user?.fullname}</span>
                )}
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>Kullanıcı Adı</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisibleUsername}
                    disabled={true}
                  ></button>
                </div>

                {isActiveUsername ? (
                  <div className={styles.editContainer}>
                    <div className={styles.content}>
                      Kullanıcı adınızı giriniz
                    </div>
                    <div className={styles.inputContainer}>
                      <div className={styles.inputContent}>
                        <div className={styles.userName}>Kullanıcı Adı</div>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.saveButton}
                      //   onClick={handleSubmitName}
                    >
                      Kaydedin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>{user.user?.username}</span>
                )}
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>E-posta</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisibleMail}
                    disabled={true}
                  ></button>
                </div>

                {isActiveMail ? (
                  <div className={styles.editContainer}>
                    <div className={styles.content}>
                      Her zaman erişebileceğiniz bir adres kullanın.
                    </div>
                    <div className={styles.inputContainer}>
                      <div className={styles.inputContent}>
                        <div className={styles.userName}>E-posta Adresi</div>
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.saveButton}
                      //   onClick={handleSubmitName}
                    >
                      Kaydedin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>{user.user?.email}</span>
                )}
              </div>

              {/*<div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>Telefon Numarası</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisiblePhone}
                  >
                    {isActivePhone ? `İptal Et` : `Düzenle`}
                  </button>
                </div>

                {isActivePhone ? (
                  <div className={styles.editContainer}>
                    <div className={styles.content}>Numaranızı girin.</div>
                    <div className={styles.inputContainer}>
                      <div className={styles.inputContent}>
                        <div className={styles.userName}>Telefon Numarası</div>
                        <input
                          type="text"
                          value={phone}
                          inputMode="numeric"
                          maxLength="11"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                    <div
                      className={styles.saveButton}
                      //   onClick={handleSubmitPhone}
                    >
                      Kaydedin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>53465251</span>
                )}
              </div>*/}

              <div
                className={`${styles.infoContainer} ${styles.passwordContainer}`}
              >
                <div className={styles.info}>
                  <span>Parola</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisiblePassword}
                  >
                    {isActivePassword ? `İptal Et` : `Düzenle`}
                  </button>
                </div>

                {isActivePassword ? (
                  <div className={styles.editContainer}>
                    <div className={styles.content}>
                      Güçlü bir parola oluşturun.
                    </div>
                    <div className={styles.inputContainer}>
                      <div>
                        <div>Eski Parola</div>
                        <div className={styles.inputContent}>
                          <input
                            type="text"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <div>Yeni Parola</div>
                        <div className={styles.inputContent}>
                          <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => {
                              const value = e.target.value;
                              setNewPassword(value);
                              setPasswordsMatch(value === newPasswordAgain);
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div>Parolayı Onaylayın</div>
                        <div className={styles.inputContent}>
                          <input
                            type="text"
                            value={newPasswordAgain}
                            onChange={(e) => {
                              const value = e.target.value;
                              setNewPasswordAgain(value);
                              setPasswordsMatch(newPassword === value);
                            }}
                          />
                        </div>
                        {newPasswordAgain && !passwordsMatch && (
                          <div
                            className={styles.errorMsg}
                            style={{ color: "red", marginTop: 8 }}
                          >
                            Parolalar eşleşmiyor!
                          </div>
                        )}
                      </div>
                    </div>
                    {showResponseMessage && (
                      <div
                        style={{ color: responseText.color, marginBottom: 24 }}
                      >
                        {responseText.text}
                      </div>
                    )}
                    <div
                      className={`${styles.saveButton} ${styles.password}`}
                      disabled={
                        !passwordsMatch ||
                        !oldPassword ||
                        !newPassword ||
                        !newPasswordAgain
                      }
                      onClick={
                        passwordsMatch ? handleUpdatePassword : undefined
                      }
                      style={{
                        cursor:
                          passwordsMatch &&
                          oldPassword &&
                          newPassword &&
                          newPasswordAgain
                            ? "pointer"
                            : "not-allowed",
                      }}
                    >
                      Parolayı Güncelleyin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>****</span>
                )}
              </div>
            </div>
          )}
          {activeTab === "favorites" && (
            <div>Favoriler içeriği buraya gelecek.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
