'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { createReview } from '@/services/reviewService';

interface AddReviewDialogProps {
  open: boolean;
  onClose: () => void;
  movieId: string;
  onSuccess?: () => void; // Optional callback after submit
}

const AddReviewDialog: React.FC<AddReviewDialogProps> = ({ open, onClose, movieId, onSuccess }) => {
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState<number | ''>('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!reviewer || !rating) {
      alert('Reviewer name and rating are required.');
      return;
    }

    setLoading(true);

    try {
        await createReview({
            movieId,
            reviewer,
            rating,
            comment
        })
      setReviewer('');
      setRating('');
      setComment('');
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error(error);
      alert('Error adding review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add a Review</DialogTitle>
      <DialogContent>
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Reviewer Name"
            fullWidth
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            required
          />

          <TextField
            label="Rating"
            select
            fullWidth
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddReviewDialog;
