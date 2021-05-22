import { Controller, Get, Post, Param, Patch, Delete, Body } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  index(): Movie[] {
    return this.moviesService.index();
  }

  @Get(":id")
  show(@Param("id") movieId: number): Movie {
    return this.moviesService.show(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto): Movie {
    return this.moviesService.create(movieData);
  }

  @Patch(":id")
  update(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto): Movie {
    return this.moviesService.update(movieId, updateData);
  }

  @Delete(":id")
  destroy(@Param("id") movieId: number): Movie[] {
    this.moviesService.destroy(movieId);
    return this.index();
  }
}
