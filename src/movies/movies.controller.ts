import { Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return "return all movies.";
  }

  @Get("/:id")
  getOne(@Param("id") movieId: string): string {
    return `return movie ${movieId}.`;
  }

  @Post()
  create(): string {
    return "create new movie."
  }

  @Patch("/:id")
  update(@Param("id") movieId: string): string {
    return `update movie ${movieId}.`
  }

  @Delete("/:id")
  destroy(@Param("id") movieId: string): string {
    return `destroy movie ${movieId}.`
  }
}
