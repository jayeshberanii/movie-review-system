import { axiosInstance } from "@/utils/axiosInstance";

// Get all movies
export const getMovies = async (genre: string, releaseYear: string, sortBy: string) => {
    try {
        const response = await axiosInstance.get("/movies", {
            params: {
                genre,
                releaseYear,
                sortBy,
            },
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMovie = async (id: string) => {
    try {
        const response = await axiosInstance.get(`/movies/${id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createMovie = async (movie: any) => {
    try {
        return await axiosInstance.post(`/movies`, movie);
    } catch (error) {
        console.error(error);
        throw error;
    }
}