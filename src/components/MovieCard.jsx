import React, { useState } from "react";
import VideoModal from "./VideoModal";

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, release_date, original_language, id } =
    movie;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoKey, setVideoKey] = useState(null);

  const fetchMovieVideo = async () => {
    const API_BASE_URL = "https://api.themoviedb.org/3";
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const trailer = data.results.find((video) => video.type === "Trailer");
        setVideoKey(trailer ? trailer.key : null);
      } else {
        setVideoKey(null);
      }
    } catch (error) {
      console.error("Failed to fetch video:", error);
      setVideoKey(null);
    }
  };

  const handleCardClick = async () => {
    await fetchMovieVideo();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="movie-card cursor-pointer" onClick={handleCardClick}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "/no-movie.png"
          }
          alt={title}
        />
        <div className="mt-4">
          <h3>{title}</h3>
          <div className="content">
            <div className="rating">
              <img src="star.svg" alt="Star Icon" />
              <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            </div>
            <span>•</span>
            <p className="lang">{original_language}</p>
            <span>•</span>
            <p className="year">
              {release_date ? release_date.split("-")[0] : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoKey={videoKey}
      />
    </>
  );
};

export default MovieCard;
