import * as reviewRepository from "../repositories/reviewRepository";
import { Request, Response } from "express";

// Create a new review
export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await reviewRepository.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get all reviews for a specific movie
export const getMovieReviews = async (req: Request, res: Response) => {
    try {
        // validate input
        const {movieId} = req.params;

        if (!movieId || typeof movieId !== 'string') {
            return res.status(400).json({ error: 'Movie ID is required' });
        }

        const reviews = await reviewRepository.getMovieReviews(movieId);
        res.status(200).json(reviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}