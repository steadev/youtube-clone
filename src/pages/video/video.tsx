import React from "react";
import { useParams } from "react-router-dom";
import { Youtube } from "../../services/youtube";
import { VideoList } from "./components/video-list";
import { VideoPlayer } from "./components/video-player";
import styles from "./video.module.scss";

interface VideoProps {
  youtube: Youtube;
}

const Video = ({ youtube }: VideoProps) => {
  const params = useParams();
  const videoId = params.id;

  return (
    <div className={styles.video}>
      <VideoPlayer id={videoId ?? ""}></VideoPlayer>
      <VideoList youtube={youtube}></VideoList>
    </div>
  );
};

export default Video;
