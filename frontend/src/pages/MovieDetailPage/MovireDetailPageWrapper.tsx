// app/movies/[id]/page.tsx
'use client'; // MUI needs client context

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Container,
  Button,
} from '@mui/material';
import { useParams } from 'next/navigation';
import { getMovie } from '@/services/movieService';
import AddReviewDialog from './components/AddReviewDialog';
import { getMovieReviews } from '@/services/reviewService';
import Link from 'next/link';

interface Review {
  _id: string;
  reviewer: string;
  rating: number;
  comment?: string;
}

interface Movie {
  _id: string;
  title: string;
  genre: string;
  releaseYear: number;
  averageRating?: number;
}

export default function MoviePage({ id }: { id: string }) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    getMovieReviews(id)
      .then(res => {
        setReviews(res);
      })
      .catch(err => {
        console.error('Failed to fetch reviews:', err);
      });

    getMovie(id)
      .then(res => {
        setMovie(res);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch movie:', err);
        setLoading(false);
      });
  }, [id]);

  const onSuccess = () => {
    getMovieReviews(id)
      .then(res => {
        setReviews(res);
      })
      .catch(err => {
        console.error('Failed to fetch reviews:', err);
      });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Typography variant="h6" color="error">
        Movie not found.
      </Typography>
    );
  }

  return (
    <>
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Link   href="/movies">
          <Button sx={{mb: 2}} variant="contained" color="primary">
            Back
          </Button>
        </Link>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {movie.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Genre: {movie.genre} | Year: {movie.releaseYear}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Average Rating: {movie.averageRating?.toFixed(1) ?? 'N/A'}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5" gutterBottom>
          Reviews
        </Typography>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Review
        </Button>
        </Box>

        {reviews?.length > 0 ? (
          <List>
            {reviews.map(review => (
              <React.Fragment key={review._id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`${review.reviewer} - ★ ${review.rating}`}
                    secondary={review.comment || 'No comment'}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Typography>No reviews yet.</Typography>
        )}
      </Paper>
    </Container>
    <AddReviewDialog open={open} onClose={() => setOpen(false)} movieId={id} onSuccess={() => onSuccess()} />
    </>
  );
}
