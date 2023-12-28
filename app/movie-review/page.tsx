import MovieForm from "@/components/movie-review/MovieForm";
import React from "react";

const MovieReview = () => {
  return (
    <main className="mt-40 flex justify-center">
      <div className="flex flex-col gap-y-8">
        <h1 className="text-3xl font-bold">Movie Review</h1>
        <MovieForm />
        <br />
        <br />
        <h2 className="text-2xl font-semibold">Existing Reviews</h2>
        {/* <MovieList /> */}
      </div>
    </main>
  );
};

export default MovieReview;
