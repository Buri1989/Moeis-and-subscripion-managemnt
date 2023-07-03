import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';

const Movies2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const showName = location.state;
    const userOnline = sessionStorage.getItem('userOnline');
    const user = JSON.parse(userOnline);
    const [findMovie, setFindMovie] = useState(showName);
    useEffect(() => {
        if (findMovie) {
            navigate('movieData2', { state: { findMovie } });
        }
        else {
            navigate('movieData2')
        }
    }, []);
    return (
        <Container>
            <h1 style={{ textAlign: 'center', fontFamily: 'Comic Sans MS', fontSize: '3rem', color: '#4a6baf' }}>Movies</h1>
            <Button sx={{ padding: 2, marginTop: 2 }} variant="outlined" size="small" type="submit" color="primary"
                onClick={() => navigate('moviesData2')}>All Movies</Button>
            {user.permissions.include('Create Movies') && <button sx={{ padding: 2, marginTop: 2, marginLeft: 1 }}
                varian='outlined' size='small' type='submit' color='primary'
                onClick={() => navigate(`/mainPage/movies2/addNewMovie`)}>Add Movie</button>}
            <TextField sx={{ padding: 1, marginTop: 2, marginLeft: 1 }} required label='Find Movie' id='outlined-find-movie'
                onChange={(event) => setFindMovie(event.target.value)} />
            <Button sx={{ padding: 2, marginTop: 2, marginLeft: 2 }} variant="outlined" size="small" type="submit" color="primary"
                onClick={() => navigate('moviesData2', { state: { findMovie } })}>{" "}Find{" "}</Button>
            <Outlet />
        </Container>
    )
}

export default Movies2
