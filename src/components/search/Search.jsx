import styles from "./search.module.scss";

const Search = () => {
  return (
    <div className={styles.search}>
      <div className={styles.searchBar}>
        <input type="text" placeholder="Kitap ara" />
        <button>Ara</button>
      </div>
    </div>
  );
};

export default Search;
