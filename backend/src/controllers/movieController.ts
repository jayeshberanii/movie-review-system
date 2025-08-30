import { Request, Response } from "express";
import Movie from "../models/Movie";
import * as MovieRepository from "../repositories/movieRepository";

// Add a new movie
export const createMovie = async (req: Request, res: Response) => {
    try {
        // validate input

        const movie = await MovieRepository.createMovie(req.body);
        res.status(201).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// • Filtering:
// • Get movies by genre.
// • Get movies by release year.
// • Sorting:
// • Sort movies by release year.
// • Sort movies by average rating (higher ratings first).
export const getMovies = async (req: any, res: any) => {
    try {
        const { genre, releaseYear, sortBy } = req.query;

        const movies = await MovieRepository.getMovies(genre, releaseYear, sortBy);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a single movie by ID
export const getMovie = async (req: any, res: any) => {
    try {
        const movie = await MovieRepository.getMovie(req.params.id);
        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

