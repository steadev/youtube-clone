import React from "react";

interface VideoPlayerProps {
  id: string;
}

export const VideoPlayer = ({ id }: VideoPlayerProps) => {
  const origin = `http://localhost:3000`;
  const src = `http://www.youtube.com/embed/${id}?enablejsapi=1&origin=${origin}`;
  return (
    <iframe
      id="player"
      style={{ marginRight: "2rem" }}
      width="1280"
      height="680"
      src={src}
    ></iframe>
  );
};
