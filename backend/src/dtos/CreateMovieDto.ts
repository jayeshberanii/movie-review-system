// src/dtos/CreateMovieDto.ts

import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title!: string;

  @IsNotEmpty({ message: 'Genre is required' })
  @IsString({ message: 'Genre must be a string' })
  genre!: string;

  @IsInt({ message: 'Release year must be a number' })
  @Min(1888, { message: 'Release year must be 1888 or later' }) // first known film year
  @Max(new Date().getFullYear(), {
    message: `Release year cannot be in the future`,
  })
  releaseYear!: number;
}
