import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
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

const AudiobookPlayer = ({
  book,
  meet,
  compact = false,
  pageSize = PAGE_SIZE,
  singlePageStyle,
}) => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef(null);
  const socketRef = useRef(null);
  const isRemoteAction = useRef(false);

  const [transcriptSrc, setTranscriptSrc] = useState(book?.audioSyncJsonUrl);
  const [audioSrc, setAudioSrc] = useState(book?.audioBookUrl);
  const [isWaitingToSync, setIsWaitingToSync] = useState(false); // ✅ EKLENDİ

  // Transcript yükle
  useEffect(() => {
    if (!book?.audioSyncJsonUrl) return;
    fetch(book.audioSyncJsonUrl)
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
        setError("Metin yüklenemedi veya bulunamadı.");
        console.error("Transcript yüklenemedi:", err);
      });
  }, [book?.audioSyncJsonUrl, pageSize]);

  // SOCKET.IO ile real-time kontrol
  useEffect(() => {
    if (!meet?._id) return;
    socketRef.current = io(import.meta.env.VITE_SOCKET_CLIENT_URL);
    socketRef.current.emit("joinRoom", meet._id);

    // Sadece yeni gelen kullanıcıya uygulanır, emit yapılmaz!
    socketRef.current.on("initialAudioState", ({ isPlaying, currentTime }) => {
      if (audioRef.current) {
        audioRef.current.currentTime = currentTime;
        setCurrentTime(currentTime);
        setIsPlaying(isPlaying);
        // Eğer başka biri oynatıyorsa, buton gözüksün
        setIsWaitingToSync(isPlaying);
        // Otomatik play çağırma!
      }
    });

    // Diğer tüm kullanıcılar için
    socketRef.current.on("audio-state", ({ isPlaying, currentTime }) => {
      setIsPlaying(isPlaying);
      setCurrentTime(currentTime);
      if (audioRef.current) {
        if (Math.abs(audioRef.current.currentTime - currentTime) > 0.5) {
          audioRef.current.currentTime = currentTime;
        }
        if (isPlaying) {
          audioRef.current.play().catch((e) => {
            console.warn("Play blocked (audio-state)", e);
          });
        } else {
          if (!audioRef.current.paused) {
            audioRef.current.pause();
          }
        }
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [meet?._id]);

  // Audio eventlerini emit et
  const emitAudioControl = (isPlay) => {
    if (socketRef.current && meet?._id && audioRef.current) {
      isRemoteAction.current = true; // bizim tetikleyicimiz olduğunu söyle
      socketRef.current.emit("audio-control", {
        roomId: meet._id,
        isPlaying: isPlay,
        currentTime: audioRef.current.currentTime,
      });

      // 100ms sonra sıfırla
      setTimeout(() => {
        isRemoteAction.current = false;
      }, 100);
    }
  };

  const handlePlay = () => {
    if (!isRemoteAction.current) emitAudioControl(true);
  };
  const handlePause = () => {
    if (!isRemoteAction.current) emitAudioControl(false);
  };
  const handleSeek = () => {
    if (!isRemoteAction.current) emitAudioControl(isPlaying);
  };

  // Audio zamanını manuel olarak değiştirme (slider vs.) durumunda da tetiklenmeli
  // Eğer farklı bir seek event'in varsa, burada da emitAudioControl çağırabilirsin.

  // Audio zamanı takip et ve metin sayfasını güncelle
  useEffect(() => {
    const findPageForTime = (time) => {
      for (let i = 0; i < pages.length; i++) {
        const pageSegments = pages[i];
        if (pageSegments.some((seg) => time >= seg.start && time < seg.end)) {
          return i;
        }
      }
      return currentPage;
    };
    const interval = setInterval(() => {
      if (audioRef.current) {
        const newTime = audioRef.current.currentTime;
        setCurrentTime(newTime);
        const correctPage = findPageForTime(newTime);
        // Sadece gerçekten farklı bir sayfadaysak güncelle
        if (correctPage !== currentPage) {
          setCurrentPage(correctPage);
        }
        // Otomatik page ilerletmede audio'yu ileriye sarmıyoruz!
      }
    }, 500);
    return () => clearInterval(interval);
  }, [currentPage, pages]);

  // Aktif segmenti bul
  const activePage = pages[currentPage] || [];
  const activeIndex = activePage.findIndex(
    (seg) => currentTime >= seg.start && currentTime < seg.end
  );

  // Sayfa değişiminde audio'yu otomatik olarak sarmıyoruz.
  // Sadece kullanıcı "ileri" veya "geri" butonuna bastığında audio'yu sar ve emit et.
  const goNext = () => {
    setCurrentPage((p) => {
      const next = Math.min(p + 1, pages.length - 1);
      const firstSeg = pages[next]?.[0];
      if (firstSeg && audioRef.current) {
        audioRef.current.currentTime = firstSeg.start;
        emitAudioControl(isPlaying); // Sadece kullanıcı aksiyonunda emit
      }
      return next;
    });
  };
  const goPrev = () => {
    setCurrentPage((p) => {
      const prev = Math.max(p - 1, 0);
      const firstSeg = pages[prev]?.[0];
      if (firstSeg && audioRef.current) {
        audioRef.current.currentTime = firstSeg.start;
        emitAudioControl(isPlaying); // Sadece kullanıcı aksiyonunda emit
      }
      return prev;
    });
  };

  // useEffect ile otomatik sarmayı kaldırdık!

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
              <img src={book?.img} alt="" />
            </div>
            <ul className={styles.bookDetails}>
              <li className={styles.bookName}>
                <strong>Kitap Adı:</strong> {book?.title}
              </li>
              <li className={styles.author}>
                <strong>Yazar:</strong> {book?.author}
              </li>
              <li className={styles.time}>
                <strong>Süre:</strong> {book?.time}
              </li>
              <li className={styles.category}>
                <strong>Kategori:</strong> {book?.category}
              </li>
              <li className={styles.voicedBy}>
                <strong>Çeviren:</strong> {book?.translatedBy}
              </li>
              <li className={styles.language}>
                <strong>Dil:</strong> {book?.language}
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
      <div
        className={styles.audioContainer}
        style={singlePageStyle ? { marginLeft: "340px" } : {}}
      >
        <audio
          ref={audioRef}
          controls
          src={book?.audioBookUrl || ""}
          onPlay={handlePlay}
          onPause={handlePause}
          onSeeked={handleSeek}
        />
        {isWaitingToSync && (
          <div className={styles.syncNotice}>
            <button
              onClick={() => {
                setIsWaitingToSync(false);
                // O anki odadaki state'e göre zaman ve oynatma durumunu senkronla
                if (audioRef.current) {
                  audioRef.current.currentTime = currentTime; // Oda state'ine çek
                  isRemoteAction.current = true;
                  const playPromise = audioRef.current.play();
                  if (playPromise !== undefined) {
                    playPromise.catch((err) =>
                      console.warn("Autoplay blocked", err)
                    );
                  }
                  setTimeout(() => {
                    isRemoteAction.current = false;
                  }, 500);
                }
              }}
            >
              Dinlemeye Katıl
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudiobookPlayer;
