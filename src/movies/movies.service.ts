import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find(movie => movie.id === +id); // "+id" is same as "parseInt(id)" 
  }

  create(data): Movie {
    const movie = new Movie(this.movies.length + 1, data.title, data.year, data.gernes);
    this.movies.push(movie);
    return movie;
  }

  destroy(id: string): boolean {
    this.movies.filter(movie => movie.id !== +id);
    return true;
  }
}
