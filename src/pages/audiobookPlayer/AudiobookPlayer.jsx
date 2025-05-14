import { useEffect, useRef, useState } from "react";
import styles from "./audiobookPlayer.module.scss";

const AUDIO_SRC = "/kucuk_prens.mp4";
const TRANSCRIPT_SRC = "/kucuk_prens.json";
const PAGE_SIZE = 12;

function splitTranscriptToPages(transcript, pageSize = PAGE_SIZE) {
  const pages = [];
  for (let i = 0; i < transcript.length; i += pageSize) {
    pages.push(transcript.slice(i, i + pageSize));
  }
  return pages;
}

const AudiobookPlayer = ({ compact = false, pageSize = PAGE_SIZE }) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState("");
  const audioRef = useRef(null);

  // Transcript yükle
  useEffect(() => {
    fetch(TRANSCRIPT_SRC)
      .then((res) => {
        if (!res.ok) throw new Error("Transcript dosyası bulunamadı!");
        return res.json();
      })
      .then((data) => {
        setPages(splitTranscriptToPages(data, pageSize));
        setError("");
      })
      .catch((err) => {
        setPages([]);
        setError(
          "Metin yüklenemedi veya bulunamadı. Lütfen kucuk_prens.json dosyasını public klasörüne ekleyin ve formatını kontrol edin."
        );
        console.error("Transcript yüklenemedi:", err);
      });
  }, []);

  // Audio zamanı takip et
  useEffect(() => {
    const findPageForTime = (time) => {
      for (let i = 0; i < pages.length; i++) {
        const pageSegments = pages[i];
        if (pageSegments.some((seg) => time >= seg.start && time < seg.end)) {
          return i;
        }
      }
      return currentPage; // Eğer uygun sayfa bulunamazsa mevcut sayfada kal
    };

    const interval = setInterval(() => {
      if (audioRef.current) {
        const newTime = audioRef.current.currentTime;
        setCurrentTime(newTime);

        // Mevcut zamana göre doğru sayfayı bul
        const correctPage = findPageForTime(newTime);
        if (correctPage !== currentPage) {
          setCurrentPage(correctPage);
        }

        // Eğer mevcut sayfanın son segmentinin bitiş zamanına ulaşıldıysa
        const currentPageSegments = pages[currentPage] || [];
        const lastSegment = currentPageSegments[currentPageSegments.length - 1];

        if (lastSegment && newTime >= lastSegment.end) {
          // Sonraki sayfaya geç
          if (currentPage < pages.length - 1) {
            setCurrentPage((prev) => prev + 1);
          }
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [currentPage, pages]);

  // Aktif segmenti bul
  const activePage = pages[currentPage] || [];
  const activeIndex = activePage.findIndex(
    (seg) => currentTime >= seg.start && currentTime < seg.end
  );

  const goNext = () => setCurrentPage((p) => Math.min(p + 1, pages.length - 1));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 0));

  // Sayfa değişince audio'yu o sayfanın başına sar (isteğe bağlı)
  useEffect(() => {
    if (pages.length > 0 && audioRef.current) {
      const firstSeg = pages[currentPage]?.[0];
      if (firstSeg) {
        audioRef.current.currentTime = firstSeg.start;
      }
    }
    // eslint-disable-next-line
  }, [currentPage]);

  return (
    <div
      className={
        compact
          ? `${styles.audiobookContainer} ${styles.compact}`
          : styles.audiobookContainer
      }
    >
      <div className={styles.audiobookContent}>
        <div className={styles.bookInfosContainer}>
          <div className={styles.bookInfos}>
            <div className={styles.bookImg}>
              <img src="/images/kucuk_prens.jpeg" alt="" />
            </div>
            <ul className={styles.bookDetails}>
              <li className={styles.bookName}>
                <strong>Kitap Adı:</strong> Küçük Prens
              </li>
              <li className={styles.author}>
                <strong>Yazar:</strong> Antoine de Saint-Exupéry
              </li>
              <li className={styles.time}>
                <strong>Süre:</strong> 1sa 30dk
              </li>
              <li className={styles.category}>
                <strong>Kategori:</strong> Çocuk
              </li>
              <li className={styles.voicedBy}>
                <strong>Seslendiren:</strong> Mirgün Cabas
              </li>
              <li className={styles.language}>
                <strong>Dil:</strong> Türkçe
              </li>
            </ul>
          </div>
          <div className={styles.bookTextContainer}>
            <div className={styles.bookTextContent}>
              <div className={styles.bookText}>
                {error ? (
                  <span style={{ color: "#c00", fontWeight: "bold" }}>
                    {error}
                  </span>
                ) : activePage.length === 0 ? (
                  <span style={{ color: "#aaa" }}>
                    Metin yükleniyor veya bulunamadı.
                  </span>
                ) : (
                  activePage.map((seg, i) => (
                    <span
                      key={i}
                      style={{
                        fontWeight: i === activeIndex ? "bold" : "normal",
                        color: i === activeIndex ? "#ff6600" : "#222",
                        background:
                          i === activeIndex ? "#ffe5cc" : "transparent",
                        display: "block",
                        margin: "4px 0",
                      }}
                    >
                      {seg.text}
                    </span>
                  ))
                )}
              </div>
            </div>
            <div className={styles.pageButtons}>
              <button onClick={goPrev} disabled={currentPage === 0}>
                ← Geri
              </button>
              <span>
                Sayfa {pages.length === 0 ? 0 : currentPage + 1} /{" "}
                {pages.length}
              </span>
              <button
                onClick={goNext}
                disabled={
                  currentPage === pages.length - 1 || pages.length === 0
                }
              >
                İleri →
              </button>
            </div>
          </div>
          <div className={styles.otherInfos}></div>
        </div>
      </div>
      <div className={styles.audioContainer}>
        <audio ref={audioRef} controls src={AUDIO_SRC}></audio>
      </div>
    </div>
  );
};

export default AudiobookPlayer;
