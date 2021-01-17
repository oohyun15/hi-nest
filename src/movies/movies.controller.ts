import { Controller, Get, Post, Param, Patch, Delete, Query, Body } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  // @Get("search")
  // search(@Query("year") year: string, @Query("title") title: string): string {
  //   return `You are searching for movies... title: ${title}, year: ${year}`;
  // }

  @Get(":id")
  getOne(@Param("id") movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() data): Movie {
    return this.moviesService.create(data);
  }

  @Patch(":id")
  update(@Param("id") movieId: string, @Body() data): Movie {
    return this.moviesService.update(movieId, data);
  }

  @Delete(":id")
  destroy(@Param("id") movieId: string): Movie[] {
    this.moviesService.destroy(movieId);
    return this.getAll();
  }
}
