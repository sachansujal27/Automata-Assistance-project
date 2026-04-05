import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import videoFile from "../assets/video.mp4"; // ⭐ important

export default function VideoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Mainpage");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: "100vh", background: "black" }}>
      <video
        src={videoFile}
        autoPlay
        unmuted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
