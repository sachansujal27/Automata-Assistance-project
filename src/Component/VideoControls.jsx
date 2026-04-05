import React from "react";

const VideoControls = ({
  onPrev,
  onNext,
  onPlay,
  onPause,
  listening,
  onVoice,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        ⬅ Previous
      </button>

      <button
        onClick={onPlay}
        className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        ▶ Play
      </button>

      <button
        onClick={onPause}
        className="px-6 py-3 rounded-2xl bg-red-500 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        ⏸ Pause
      </button>

      <button
        onClick={onNext}
        className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        Next ➡
      </button>

      <button
        onClick={onVoice}
        className="px-6 py-3 rounded-2xl bg-pink-600 text-white font-semibold shadow-lg hover:scale-105 transition"
      >
        {listening ? "🎙 Listening..." : "🎙 Voice Control"}
      </button>
    </div>
  );
};

export default VideoControls;
