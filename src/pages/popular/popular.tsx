import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/search-bar";
import { Youtube } from "../../services/youtube";
import styles from "./popular.module.scss";

type PopularProps = {
  youtube: Youtube;
};

type VideoListItemProps = {
  data: any;
};

const Popular = ({ youtube }: PopularProps) => {
  const [videos, setVideos] = useState<any>([]);

  const getPopularList = () => {
    youtube
      .mostPopular() //
      .then((res) => setVideos([...videos, ...res]));
  };
  useEffect(() => {
    getPopularList();
  }, []);
  return (
    <>
      <SearchBar />
      <div className={styles.list}>
        {videos.map((item: any) => {
          return (
            <VideoListItem
              key={item.id}
              className={styles.item}
              data={item}
            ></VideoListItem>
          );
        })}
      </div>
    </>
  );
};

const VideoListItem = (
  props: VideoListItemProps & React.HTMLAttributes<HTMLDivElement>
) => {
  const navigate = useNavigate();
  const { data } = props;
  const { snippet } = data;
  const handleClick = () => {
    navigate(`/${data.id}`);
  };
  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.thumbnail}>
        <img src={snippet.thumbnails.high.url} alt="thumbnail" />
      </div>
      <h3>
        <div className={styles.title}>{snippet.title}</div>
      </h3>
      <div className={styles.channelTitle}>{snippet.channelTitle}</div>
      <div className={styles.publishedAt}>{getDate(snippet.publishedAt)}</div>
    </div>
  );
};

const getDate = (data: string) => {
  const date = new Date(data);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export default Popular;
