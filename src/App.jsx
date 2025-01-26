// App.jsx
import { Client } from 'appwrite';
import React, { useState, useEffect } from "react";
import { Search } from "./components/Search";
import MovieCard from "./components/MovieCard";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 1000);

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchMovies = async (query= " ") => {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const response = await fetch(
        query
          ? `${API_BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`

      );

      if (!response.ok) {

        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMovies(data.results);
      if (data.results.length > 0) {
        await updateSearchCount(searchTerm, data.results[0]);
      }
      console.log(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main className="min-h-screen w-full bg-primary ">
      <div className="hero-section">
        <div className="pattern bg-hero-pattern w-screen h-screen bg-center bg-cover absolute z-0  " />
        <div className="wrapper px-5 py-12 xs:p-10 max-w-7xl mx-auto flex flex-col relative z-10">
          <header className="hero-header sm:mt-10 mt-5 flex flex-col items-center">
            <img
              src="/src/assets/hero-img.png"
              alt="Hero Banner"
              className="max-w-lg h-[50vh] object-contain mx-auto drop-shadow-md"
            />
            <h1 className="hero-title mx-auto max-w-4xl text-center text-5xl font-bold leading-tight tracking-[-1%] text-white sm:text-[64px] sm:leading-[76px]">
              Discover <span className="text-gradient">Movies</span> You'll Love
              Without the Hassle
            </h1>
            <div className="flex justify-center">
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
          </header>

          {loading && (
            <div className="flex justify-center items-center h-screen">
              <p>Loading...</p>
            </div>
          )}
          {error && <div className="text-red-500">{error}</div>}
          {movies.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
