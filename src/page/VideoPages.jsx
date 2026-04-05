import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function VideoPages() {
  const videoData = [
    {
      id: 1,
      title: "Introduction to DFA",
      description: "Learn DFA basics with explanation.",
      videoUrl: "https://www.youtube.com/embed/CiXJnosT0UE",
    },
    {
      id: 2,
      title: "Introduction to NFA",
      description: "Learn NFA basics with explanation.",
      videoUrl: "https://www.youtube.com/embed/Dli3czfNvlo",
    },
    {
      id: 3,
      title: "NFA to DFA Conversion",
      description: "Understand conversion step by step.",
      videoUrl: "https://www.youtube.com/embed/WKPeYsuBpm4",
    },
    {
      id: 4,
      title: "DFA Conversion Minimization",
      description: "This video explains minimization steps with examples.",
      videoUrl: "https://www.youtube.com/embed/A7eKj_GXam0",
    },
    {
      id: 5,
      title: "DFA Diagram",
      description: "This video explains DFA diagram concepts.",
      videoUrl: "https://www.youtube.com/embed/CiXJnosT0UE",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVideo = videoData[currentIndex];

  const nextVideo = () => {
    if (currentIndex < videoData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="video-topic-page">
      <div className="video-topic-wrapper">
        <div className="video-top-bar">
          <Link to="/Mainpage" className="video-back-btn">
            ⬅ Back
          </Link>

          <h1 className="video-page-title">🎥 Video Explanation Page</h1>

          <div className="video-empty-box"></div>
        </div>

        <div className="video-content-card">
          <iframe
            className="video-topic-player"
            src={currentVideo.videoUrl}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <h2 className="video-topic-title">{currentVideo.title}</h2>
          <p className="video-topic-desc">{currentVideo.description}</p>

          <div className="video-button-row">
            <button className="video-btn btn-blue" onClick={prevVideo}>
              ⬅ Previous
            </button>

            <button className="video-btn btn-purple" onClick={nextVideo}>
              Next ➡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPages;
