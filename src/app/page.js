"use client";
import { useState } from "react";
import Image from "next/image";

export default function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    if (!query) return;
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setMovies(data.Search || []);
  };

  const fetchMovieDetails = async (id) => {
    const res = await fetch(`/api/movie?id=${id}`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a movie..."
        className="border p-2 w-full"
      />
      <button onClick={fetchMovies} className="mt-2 p-2 bg-blue-500 text-white">
        Search
      </button>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} onClick={() => fetchMovieDetails(movie.imdbID)} className="cursor-pointer border p-2">
            <Image src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"} alt={movie.Title} width={100} height={150} />
            <h3>{movie.Title} ({movie.Year})</h3>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="mt-4 p-4 border">
          <h2>{selectedMovie.Title} ({selectedMovie.Year})</h2>
          <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
          <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
        </div>
      )}
    </div>
  );
}

// API Routes


