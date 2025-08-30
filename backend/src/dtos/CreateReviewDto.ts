// src/dtos/CreateReviewDto.ts

import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'Movie ID is required' })
  @IsMongoId({ message: 'Movie ID must be a valid MongoDB ObjectId' })
  movieId!: string;

  @IsNotEmpty({ message: 'Reviewer name is required' })
  @IsString({ message: 'Reviewer must be a string' })
  reviewer!: string;

  @IsInt({ message: 'Rating must be a number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating!: number;

  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;
}
