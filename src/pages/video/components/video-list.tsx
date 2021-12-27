import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    getPopularList();
  }, []);

  return (
    <div className={styles.videoList}>
      {videos.map((video: any) => {
        return <VideoListItem video={video} youtube={youtube}></VideoListItem>;
      })}
    </div>
  );
};

const VideoListItem = ({ video: { snippet }, youtube }: any) => {
  console.log(snippet);
  return (
    <div className={styles.item}>
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
