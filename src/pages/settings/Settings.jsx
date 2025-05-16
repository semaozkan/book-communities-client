import { useState } from "react";
import styles from "./settings.module.scss";
import { FaUserLarge } from "react-icons/fa6";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const [isActiveName, setIsActiveName] = useState(false);
  const [isActiveUsername, setIsActiveUsername] = useState(false);
  const [isActiveMail, setIsActiveMail] = useState(false);
  const [isActivePhone, setIsActivePhone] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

          <div
            className={`${styles.item} ${
              activeTab === "favorites" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            <FaUserLarge />
            <span>Favoriler</span>
          </div>
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
                    <div
                      className={styles.saveButton}
                      //   onClick={handleSubmitName}
                    >
                      Kaydedin
                    </div>
                  </div>
                ) : (
                  <span className={styles.content}>Semanur Özkan</span>
                )}
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>Kullanıcı Adı</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisibleUsername}
                  >
                    {isActiveUsername ? `İptal Et` : `Düzenle`}
                  </button>
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
                  <span className={styles.content}>semanurozkan5</span>
                )}
              </div>

              <div className={styles.infoContainer}>
                <div className={styles.info}>
                  <span>Eposta</span>
                  <button
                    className={styles.editButton}
                    onClick={handleVisibleMail}
                  >
                    {isActiveMail ? `İptal Et` : `Düzenle`}
                  </button>
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
                  <span className={styles.content}>
                    semanurozkan5@gmail.com
                  </span>
                )}
              </div>

              <div className={styles.infoContainer}>
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
              </div>

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
                        <div>Yeni Parola</div>
                        <div className={styles.inputContent}>
                          <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => {
                              const value = e.target.value;
                              setNewPassword(value);
                              setPasswordsMatch(value === newPassword);
                              console.log(newPassword);
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
                              setPasswordsMatch(value === newPassword);
                              console.log(newPasswordAgain);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${styles.saveButton} ${styles.password}`}
                      disabled={!passwordsMatch}
                      //   onClick={handleSubmitPassword}
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
