import { useState } from "react";
import styles from "./login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(`${FETCH}auth/login`, {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      console.log(res);

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      return;
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label htmlFor="email">E-Posta:</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Lütfen e-posta adresinizi girin"
                required
                value={email}
                onFocus={() => setError("")}
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
                onFocus={() => setError("")}
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

            {error && (
              <div className={styles.errorBox}>
                <span className={styles.icon}>❗</span>
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
