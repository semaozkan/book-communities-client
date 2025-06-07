import styles from "./search.module.scss";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SearchResultCard from "./SearchResultCard";

/**
 * Search component
 * Props:
 * - onSearch: (query: string) => results[] (optional, debounce ile çağrılır)
 * - results: dışarıdan gelen sonuçlar (optional)
 * - placeholder: input placeholder (optional)
 * - renderResult: (item) => ReactNode (optional, default: SearchResultCard)
 */
const Search = ({
  onSearch,
  results: externalResults,
  placeholder,
  renderResult,
  simple = false,
  dropdown = true,
  onChange,
}) => {
  const FETCH = import.meta.env.VITE_FETCH_URL;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef();

  useEffect(() => {
    if (simple === true || dropdown === false) {
      // Sadece input, dışarıya bildir
      if (onChange) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
          onChange(query);
        }, 350);
        return () => debounceRef.current && clearTimeout(debounceRef.current);
      }
      return;
    }
    if (!query.trim()) {
      setShowResults(false);
      setResults([]);
      setError("");
      setLoading(false);
      return;
    }
    setShowResults(true);
    setLoading(true);
    setError("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (onSearch) {
        // Local veya parent filtreleme
        try {
          const res = await onSearch(query);
          setResults(res || []);
          setError("");
        } catch (err) {
          setResults([]);
          setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
          setLoading(false);
        }
      } else {
        // Default: kitap API araması
        try {
          const res = await axios.get(
            `${FETCH}books/search?query=${encodeURIComponent(query)}`
          );
          setResults(res.data);
          setError("");
        } catch (err) {
          setResults([]);
          setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
          setLoading(false);
        }
      }
    }, 400);
    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [query, FETCH, onSearch, simple, dropdown, onChange]);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  // Sonuç kaynağı: dışarıdan geliyorsa onu kullan, yoksa state'deki sonuçları kullan
  const shownResults =
    typeof externalResults !== "undefined" ? externalResults : results;

  // Sadece input olarak (dropdown yok)
  if (simple === true || dropdown === false) {
    return (
      <div className={styles.search}>
        <form
          className={styles.searchBar}
          onSubmit={(e) => e.preventDefault()}
          autoComplete="off"
        >
          <input
            type="text"
            placeholder={placeholder || "Arama yap..."}
            value={query}
            onChange={handleInput}
          />
          <button type="submit" disabled>
            {" "}
            Ara{" "}
          </button>
        </form>
      </div>
    );
  }

  // Home gibi dropdown ile sonuç kutusu
  return (
    <div className={styles.search}>
      <form
        className={styles.searchBar}
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <input
          type="text"
          placeholder={placeholder || "Kitap adı, yazar veya açıklama ile ara"}
          value={query}
          onChange={handleInput}
          onFocus={() => query && setShowResults(true)}
        />
        <button type="submit" disabled>
          {" "}
          Ara{" "}
        </button>
      </form>
      {showResults && (
        <div className={styles.resultsBox}>
          {loading && <div className={styles.info}>Yükleniyor...</div>}
          {error && <div className={styles.error}>{error}</div>}
          {!loading && !error && shownResults.length === 0 && (
            <div className={styles.info}>Sonuç bulunamadı.</div>
          )}
          {shownResults.map((item) =>
            renderResult ? (
              renderResult(item)
            ) : (
              <SearchResultCard key={item._id || item.id} book={item} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
