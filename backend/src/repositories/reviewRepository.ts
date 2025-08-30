import Review from "../models/Review";

// Create a new review
export const createReview = async (review: any) => {
    try {
        return await Review.create(review);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Get all reviews for a specific movie
export const getMovieReviews = async (movieId: string) => {
    try {
        return await Review.find({ movieId });
    } catch (error) {
        console.error(error);
        throw error;
    }
}