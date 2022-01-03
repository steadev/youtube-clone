import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Youtube } from "../../../services/youtube";
import styles from "./video-list.module.scss";

interface VideoListProps {
  youtube: Youtube;
}

export const VideoList = ({ youtube }: VideoListProps) => {
  const [videos, setVideos] = useState<any>([]);

  const getPopularList = () => {
    youtube
      .mostPopular() //
      .then((res) => setVideos([...videos, ...res]));
  };

  const onScroll = (event: any) => {
    console.log(event);
  };

  useEffect(() => {
    getPopularList();
  }, []);

  return (
    <div className={styles.videoList} onScroll={onScroll}>
      {videos.map((video: any) => {
        return (
          <VideoListItem
            key={video.id}
            video={video}
            youtube={youtube}
          ></VideoListItem>
        );
      })}
    </div>
  );
};

const VideoListItem = ({ video, video: { snippet }, youtube }: any) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (video.id) {
      navigate(`/${video.id}`);
    }
  };
  return (
    <div className={styles.item} onClick={handleOnClick}>
      <div className={styles.thumbnail}>
        <img src={snippet.thumbnails.high.url} alt="thumbnail" />
      </div>
      <div className={styles.content}>
        <h3>
          <div className={styles.title}>{snippet.title}</div>
        </h3>
        <div className={styles.channelTitle}>{snippet.channelTitle}</div>
        <div className={styles.publishedAt}>
          {youtube.getDate(snippet.publishedAt)}
        </div>
      </div>
    </div>
  );
};
