import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { GENRES, YEARS } from '@/utils/constants';
import { createMovie } from '@/services/movieService';

export default function AddMovieDialog({ open, setOpen, onSubmitMovie }: { open: boolean, setOpen: Function, onSubmitMovie: Function }) {

  const [genre, setGenre] = React.useState('');
  const [releaseYear, setReleaseYear] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries((formData as any).entries());
      const email = formJson.email;

      await createMovie({
        title: formJson.title,
        genre: genre,
        releaseYear: releaseYear
      });
      onSubmitMovie({
        title: formJson.title,
        genre: genre,
        releaseYear: releaseYear,
        averageRating: 0
      });
      handleClose();
    } catch (error) {
      // console.error(error);
    }
  };

  const handleGenreChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value);
  };

  const handleReleaseYearChange = (event: SelectChangeEvent) => {
    setReleaseYear(event.target.value);
  }
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Add Movie</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="movie-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
            />
            <FormControl fullWidth variant="standard">
              <InputLabel id="select-genre-label">Genre</InputLabel>
              <Select
                labelId="select-genre-label"
                id="select-genre"
                value={genre}
                onChange={handleGenreChange}
              >
                {
                  GENRES?.length > 0 ? GENRES?.map((genre) => (
                    <MenuItem value={genre}>{genre}</MenuItem>
                  )) :
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                }

              </Select>
            </FormControl>
            <FormControl fullWidth variant="standard">
              <InputLabel id="select-release-year-label">Release Year</InputLabel>
              <Select
                labelId="select-release-year-label"
                id="select-release-year"
                value={releaseYear}
                onChange={handleReleaseYearChange}
              >
                {
                  YEARS?.length > 0 ? YEARS?.map((year) => (
                    <MenuItem value={year}>{year}</MenuItem>
                  )) :
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                }

              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button type="submit" form="movie-form">
            Add Movie
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
