import { axiosInstance } from "@/utils/axiosInstance";

export const createReview = async (review: any) => {
    try {
        return await axiosInstance.post(`/reviews`, review);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMovieReviews = async (movieId: string) => {
    try {
        const response = await axiosInstance.get(`/reviews/${movieId}/reviews`);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}