import classNames from "classnames";
import React from "react";
import logoIcon from "../assets/icons/youtube-logo.png";
import styles from "./search-bar.module.scss";

const cx = classNames.bind(styles);

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.imageWrapper}>
        <img src={logoIcon} />
      </div>
      <input type="text" />
      <button>
        <i className={cx("fa", "fa-search", "searchIcon")}></i>
      </button>
    </div>
  );
};

export default SearchBar;
