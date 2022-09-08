import { getMoviesArrayLength, getRandomMovie } from "../client/client";
import { Movie } from "../interfaces/Movie";
import config from '../config';

interface MovieProps {
  movie: Movie;
  posterPath: string
}

export class MovieStore {
  constructor(
    private movies: Array<MovieProps>
  ){}

  setNewMovie = async () => {
    const maxMoviesReached = this.movies.length === getMoviesArrayLength();
    const imageBaseUrl = config.TMDB_IMAGE_BASE_URL;
    let newMovie: Movie = getRandomMovie();
    let newMoviePosterPath = `${imageBaseUrl}${newMovie.poster_path}`;

    try {
      while (this.movies.some(moviePayload => moviePayload.movie.id === newMovie.id)) {
        if (maxMoviesReached)
          break;
        
        newMovie = getRandomMovie();
        newMoviePosterPath = `${imageBaseUrl}${newMovie.poster_path}`;
      }
    } catch(e) {
      console.log(e)
    }
    
    this.movies.push({ movie: newMovie, posterPath: newMoviePosterPath })
  }

  getMoviesShownLength = () => {
    return this.movies.length;
  }

  getMovies = () => {
    return this.movies;
  }
}