import React from "react";
import logoIcon from "../assets/icons/youtube-logo.png";
import styles from "./search-bar.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.imageWrapper}>
        <img src={logoIcon} />
      </div>
      <input type="text" />
      <button>
        <i className={`fa fa-search ${styles.searchIcon}`}></i>
      </button>
    </div>
  );
};

export default SearchBar;
