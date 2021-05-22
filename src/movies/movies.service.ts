import { Injectable, NotFoundException } from '@nestjs/common';
import { exception } from 'console';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  index(): Movie[] {
    return this.movies; // fake, actually needs SQL queries
  }

  show(id: number): Movie {
    const movie = this.movies.find(movie => movie.id === id); // "+id" is same as "parseInt(id)" 
    if (!movie) throw new NotFoundException(`Movie with ID ${id} is not found.`);
    return movie;
  }

  create(movieData: CreateMovieDto): Movie {
    const movie = new Movie(this.movies.length + 1, movieData.title, movieData.year, movieData.genres);
    this.movies.push(movie);
    return movie;
  }

  // Since it doesn't use any database,
  // memory contains the movie data temporary.
  update(id: number, updateData: UpdateMovieDto): Movie {
    const movie = this.show(id);
    if (updateData.title !== undefined) movie.title = updateData.title;
    if (updateData.year !== undefined) movie.year = updateData.year;
    if (updateData.genres !== undefined) movie.genres = updateData.genres;
    return movie;
  }

  destroy(id: number) {
    this.show(id); // just validate movie id.
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }
}
