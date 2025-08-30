import Movie from "../models/Movie";

// Get all movies
export const getMovies = async (genre: string, releaseYear: string, sortBy: string) => {
  console.log(genre, releaseYear, sortBy);
  try {

    // Step 1: Build match filter for movies
    const movieMatch: any = {};

    if (genre) {
      movieMatch.genre = genre;
    }
    if (releaseYear) {
      // releaseYear can be a string from query, convert to number
      movieMatch.releaseYear = Number(releaseYear);
    }

    // Step 2: Aggregation pipeline
    const pipeline: any[] = [];

    // Match movies with filters (if any)
    if (Object.keys(movieMatch).length > 0) {
      pipeline.push({ $match: movieMatch });
    }

    // Lookup reviews and calculate average rating
    pipeline.push(
      {
        $lookup: {
          from: 'reviews', // MongoDB collection name is lowercase plural by default
          localField: '_id',
          foreignField: 'movieId',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
          reviewCount: { $size: '$reviews' },
        },
      }
    );

    // Default averageRating if no reviews
    pipeline.push({
      $addFields: {
        averageRating: { $ifNull: ['$averageRating', 0] },
      },
    });

    // Step 3: Sorting logic
    const sortCriteria: any = {};

    if (sortBy === 'releaseYear') {
      sortCriteria.releaseYear = -1; // Ascending by releaseYear
    } else if (sortBy === 'averageRating') {
      sortCriteria.averageRating = -1; // Descending by averageRating (higher first)
    } else {
      // Default sort (optional)
      sortCriteria.title = 1;
    }

    pipeline.push({ $sort: sortCriteria });

    // Step 4: Project only the needed fields
    pipeline.push({
      $project: {
        title: 1,
        genre: 1,
        releaseYear: 1,
        averageRating: 1,
        reviewCount: 1,
      },
    });

    // Execute aggregation
    const movies = await Movie.aggregate(pipeline);

    return movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Get a single movie
export const getMovie = async (id: string) => {
    try {
        return await Movie.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createMovie = async (movie: any) => {
    try {
        return await Movie.create(movie);
    } catch (error) {
        console.error(error);
        throw error;
    }
}