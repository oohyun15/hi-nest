import { Injectable, NotFoundException } from '@nestjs/common';
import { exception } from 'console';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find(movie => movie.id === +id); // "+id" is same as "parseInt(id)" 
    if (!movie) throw new NotFoundException(`Movie with ID ${id} is not found.`);
    return movie;
  }

  create(data): Movie {
    const movie = new Movie(this.movies.length + 1, data.title, data.year, data.gernes);
    this.movies.push(movie);
    return movie;
  }

  // Since it doesn't use any database,
  // memory contains the movie data temporary.
  update(id: string, data): Movie {
    const movie = this.getOne(id);
    if (data.title !== undefined) movie.title = data.title;
    if (data.year !== undefined) movie.year = data.year;
    if (data.gernes !== undefined) movie.gernes = data.gernes;
    return movie;
  }

  destroy(id: string) {
    this.getOne(id); // just validate movie id.
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }
}
