import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { Button, TextField, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';

const EditMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let movie = location.state.movie;
    const genres = movie.genres;
    const genresString = genres.join(", ");
    const isoDate = new Date(movie.premiered);
    const formattedDate = isoDate.toLocaleDateString("en-CA", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    const [movieData, setMovieData] = useState({
        name: String(movie.name),
        genres: String(movie.genres),
        imageUrl: String(movie.image),
        premiered: String(formattedDate)
    });
    const handleSubmit = async (movieDate) => {
        const object = {
            _id: movie._id,
            name: movieData.name,
            genres: [movieData.genres],
            imageUrl: movieData.imageUrl,
            premiered: movieData.premiered
        };
        dispatch({ type: 'UPDATEMOVIE', payload: object });
        /*Update movie in DB 'http://localhost:8888/movies' */
        await axios.put(`${'http://localhost:8888/movies'}/${movie._id}`, movieData)
        navigate(`/mainPage/movies2/moviesData2`);
    };
    return (
        <Container>
            <br />
            <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
                <CardMedia height='200'><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Edit Movie</h2></CardMedia>
                <CardContent>
                    <TextField sx={{ padding: 1, marginTop: 2, width: 300 }}
                        required label=' Movie Name' id='outlined-movie-name'
                        defaultValue={movie.name}
                        onChange={(event) => setMovieData({ ...movieData, name: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2, width: 300 }}
                        required label=' Genres' id='outlined-genres'
                        defaultValue={genresString}
                        onChange={(event) => setMovieData({ ...movieData, genres: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2, width: 300 }}
                        required label=' Image URL' id='outlined-image-url'
                        defaultValue={movie.image}
                        onChange={(event) => setMovieData({ ...movieData, imageUrl: event.target.value })} /><br />
                    <input style={{ padding: 20, marginTop: 8, marginLeft: 8, width: 260, borderColor: 'lightgrey ', borderWidth: 1, borderRadius: 5 }}
                        defaultValue={formattedDate} type='date' name='date'
                        onChange={(event) => setMovieData({ ...movieData, premiered: event.target.value })} /><br />
                    <br />
                    <Button sx={{ padding: 1, marginTop: 2 }}
                        variant='outlined' type='submit' onClick={() => handleSubmit(movieData)}>Update</Button>
                    <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }}
                        variant='outlined' type='submit' onClick={() => navigate(`/mainPage/movies2/moviesData2`)}>Cancel</Button>
                </CardContent>
            </Card>
        </Container>
    )
}

export default EditMovie
