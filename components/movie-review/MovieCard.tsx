import React from "react";
import { Movie } from "@/models/movie";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

type MovieCardProps = {
  movie: Movie;
};
const MovieCard = ({ movie }: MovieCardProps) => {
  console.log("movie -> ", movie);
  const { title, rating, description } = movie;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Rating: {rating}/5</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
