import MovieForm from "@/components/movie-review/MovieForm";
import MovieList from "@/components/movie-review/MovieList";
import React from "react";

const MovieReview = () => {
  return (
    <main className="flex justify-center py-20">
      <div className="flex w-1/2 flex-col gap-y-8">
        <h1 className="text-3xl font-bold">Movie Review</h1>
        <MovieForm />
        <br />
        <br />
        <h2 className="text-2xl font-semibold">Existing Reviews</h2>
        <React.Suspense fallback={<div>Loading...</div>}>
          <MovieList />
        </React.Suspense>
      </div>
    </main>
  );
};

export default MovieReview;
