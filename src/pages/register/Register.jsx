import { Link } from "react-router-dom";
import styles from "./register.module.scss";
import { useState } from "react";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.registerContainer}>
      <div className={styles.imageContainer}>
        <img src="../../../public/images/register.jpg" alt="" />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <div className={styles.formTitleContainer}>
            <h2>Kayıt Ol</h2>
          </div>
          <form>
            <div className={styles.formRow}>
              <label htmlFor="fullname">Ad Soyad:</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Ad Soyad"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="username">Kullanıcı Adı:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adı"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="email">E-Posta:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Lütfen e-posta adresinizi girin"
                required
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="password">Parola:</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Lütfen parolanızı girin"
                required
              />
            </div>

            <button type="submit">Kayıt Ol</button>
            <p className={styles.loginText}>
              Zaten bir hesabın var mı?{" "}
              <Link to="/login" className={styles.loginLink}>
                Giriş Yap
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
