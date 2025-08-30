"use client";
import { getMovies } from '@/services/movieService';
import { Movie } from '@/types/common';
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import AddMovieDialog from './components/AddMovieDialog';
import Link from 'next/link';

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 150,
        maxWidth: 300,
        flex: 1,

    },
    {
        field: 'genre',
        headerName: 'Genre',
        width: 150,
        maxWidth: 300,
        headerAlign: 'center',
        align: 'center',
        flex: 1,

    },
    {
        field: 'releaseYear',
        headerName: 'Release Year',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        maxWidth: 300,
        flex: 1,

    },
    {
        field: 'averageRating',
        headerName: 'Average Rating',
        type: 'number',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        maxWidth: 300,
        flex: 1,

    },
    {
        field: '',
        headerName: 'Actions',
        headerAlign: 'center',
        align: 'center',
        width: 150,
        renderCell: (params) => {
            return (
                <Box>
                    <Button variant='contained'>
                        <Link href={`/movies/${params.row._id}`}>View</Link>
                    </Button>
                </Box>
            );
        }
    }
];

export default function MovieListPageWrapper() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genre, setGenre] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [open, setOpen] = useState(false);

    const fetchMovies = async (genre: string, releaseYear: string, sortBy: string) => {
        try {
            const response = await getMovies(genre, releaseYear, sortBy);
            console.log(response, "response");
            setMovies(response);
        } catch (error) {
            console.error(error);
        }
    };


    // Create a debounce function
    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Memoize the debounced version of fetchMovies
    const debouncedFetchMovies = useCallback(debounce(fetchMovies, 500), []);

    useEffect(() => {
        // Debounced function will be called only after the specified delay (500ms)
        debouncedFetchMovies(genre, releaseYear, sortBy);
    }, [genre, releaseYear, sortBy, debouncedFetchMovies]); // Depend on the values to trigger the debounced function

    const onSubmitMovie = async (movie: Movie) => {
        fetchMovies(genre, releaseYear, sortBy);
    };

    return (
        <>
            <Box sx={{ height: "auto", textAlign: "center", width: '100%', p: 2 }}>
                <Typography variant="h4">Movie List</Typography>

                <Box sx={{ height: "auto", width: '100%', display: "flex", justifyContent: "center", alignItems: "center", p: 6 }}>
                    <Box sx={{ width: "100%", maxWidth: '1000px' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", py: 2 }}>
                            <TextField label="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                            <TextField label="Release Year" value={releaseYear} onChange={(e) => setReleaseYear(e.target.value)} />
                            <TextField
                                sx={{ minWidth: 200 }}
                                label="Sort By"
                                select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="averageRating">Average Rating</MenuItem>
                                <MenuItem value="releaseYear">Release Year</MenuItem>
                            </TextField>
                            <Button variant="contained" onClick={() => setOpen(true)}>Add Movie</Button>
                        </Box>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                getRowId={(row) => row._id + row.title}
                                rows={movies}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <AddMovieDialog open={open} setOpen={setOpen} onSubmitMovie={onSubmitMovie} />
        </>
    );
}
