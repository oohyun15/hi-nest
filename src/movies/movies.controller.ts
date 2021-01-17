import { Controller, Get, Post, Param, Patch, Delete, Query, Body } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return "return all movies.";
  }

  @Get("search")
  search(@Query("year") year: string, @Query("title") title: string): string {
    return `You are searching for movies... title: ${title}, year: ${year}`;
  }

  @Get(":id")
  getOne(@Param("id") movieId: string): string {
    return `return movie ${movieId}.`;
  }

  @Post()
  create(@Body() data): string {
    return data;
  }

  @Patch(":id")
  update(@Param("id") movieId: string, @Body() data) {
    return {
      updateMovieId: movieId,
      ...data
    }
  }

  @Delete(":id")
  destroy(@Param("id") movieId: string): string {
    return `destroy movie ${movieId}.`;
  }
}
