import { Link, useNavigate } from "react-router-dom";
import styles from "./register.module.scss";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const FETCH = import.meta.env.VITE_FETCH_URL;

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const fullname = formData.get("fullname");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await axios.post(`${FETCH}auth/register`, {
        fullname,
        username,
        email,
        password,
      });
      console.log(res.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                onFocus={() => setError("")}
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
                onFocus={() => setError("")}
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

export default Register;
