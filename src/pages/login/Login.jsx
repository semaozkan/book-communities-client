import { useState } from "react";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img src="../../../public/images/login.jpg" alt="" />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <div className={styles.formTitleContainer}>
            <h2>Giriş Yap</h2>
            <p>Sesli kitap dünyasına hoş geldin</p>
          </div>
          <form>
            <div className={styles.formRow}>
              <label htmlFor="email">E-Posta:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Lütfen e-posta adresinizi girin"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formRow}>
              <label htmlFor="password">Parola:</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Lütfen parolanızı girin"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit">Giriş Yap</button>
            <p className={styles.registerText}>
              Hesabınız yok mu?{" "}
              <Link to="/register" className={styles.registerLink}>
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
