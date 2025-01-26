import React from "react";

const VideoModal = ({ isOpen, onClose, videoKey }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-lg p-4 max-w-3xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        {videoKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoKey}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p className="text-center">Trailer not available.</p>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
