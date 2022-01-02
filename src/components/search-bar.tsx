import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../assets/icons/youtube-logo.png";
import { Youtube } from "../services/youtube";
import styles from "./search-bar.module.scss";

const cx = classNames.bind(styles);

const SearchBar = ({ youtube }: { youtube: Youtube }) => {
  const inputRef: React.LegacyRef<HTMLInputElement> = React.createRef();
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleSearch = (event: any) => {
    event.preventDefault();
    const inputValue = (inputRef.current as any).value;
    if (inputValue) {
      youtube.search(inputValue).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <div className={styles.searchBar}>
      <div className={styles.imageWrapper} onClick={handleLogoClick}>
        <img src={logoIcon} />
      </div>
      <input ref={inputRef} type="text" />
      <button onClick={handleSearch}>
        <i className={cx("fa", "fa-search", "searchIcon")}></i>
      </button>
    </div>
  );
};

export default SearchBar;
