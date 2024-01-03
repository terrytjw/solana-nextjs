"use client";

import React, { useEffect, useState } from "react";
import { Movie } from "@/models/movie";
import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import MovieCard from "./MovieCard";
import { MovieCoordinator } from "@/coordinators/MovieCoordinator";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

const MovieList = () => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    MovieCoordinator.fetchPage(connection, page, 5, search, search !== "").then(
      setMovies,
    );
  }, [page, search]);

  return (
    <div>
      <div className="py-4">
        <Input
          id="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center gap-x-2 p-4">
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </Button>
        <br />
        <Button
          onClick={() => setPage(page + 1)}
          disabled={MovieCoordinator.accounts.length < page * 2}
        >
          Next
        </Button>
      </div>
      <p className="p-4 text-center font-semibold text-gray-400">Page {page}</p>
    </div>
  );
};

export default MovieList;
