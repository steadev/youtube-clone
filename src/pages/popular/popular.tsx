import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube } from "../../services/youtube";
import styles from "./popular.module.scss";

type PopularProps = {
  youtube: Youtube;
};

type VideoListItemProps = {
  data: any;
  youtube: Youtube;
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
      <div className={styles.list}>
        {videos.map((item: any) => {
          return (
            <VideoListItem
              key={item.id}
              className={styles.item}
              data={item}
              youtube={youtube}
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
  const { data, youtube } = props;
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
      <div className={styles.publishedAt}>
        {youtube.getDate(snippet.publishedAt)}
      </div>
    </div>
  );
};

export default Popular;
