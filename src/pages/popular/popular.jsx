import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar";
import { environment } from "../../environment/environment.js";
import styles from "./popular.module.css";

const Popular = () => {
  const [videos, setVideos] = useState([]);
  let nextPageToken = undefined;

  const getPopularList = (pageToken) => {
    let getUrl = `${environment.youtubeApiUrl}/videos?part=snippet&maxResults=25&regionCode=kr&chart=mostPopular&key=${environment.youtubeApiKey}`;
    if (pageToken) {
      getUrl += `&pageToken=${pageToken}`;
    }
    axios
      .get(getUrl)
      .then((res) => {
        console.log(res);
        if (res?.data) {
          nextPageToken = res.data.nextPageToken;
          setVideos([...videos, ...res.data.items]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getPopularList(nextPageToken);
  }, []);
  return (
    <>
      <SearchBar />
      <div className={styles.list}>
        {videos.map((item) => {
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

const VideoListItem = (props) => {
  const { data } = props;
  const { snippet } = data;
  return (
    <div className={styles.item}>
      <div className={styles.thumbnail}>
        <img src={snippet.thumbnails.high.url} alt="thumbnail" />
      </div>
      <div className={styles.title}>{snippet.title}</div>
      <div className={styles.publishedAt}>{snippet.publishedAt}</div>
    </div>
  );
};

export default Popular;
