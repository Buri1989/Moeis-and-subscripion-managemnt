import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Container } from '@mui/system';
import { AppBar, Button, IconButton, Toolbar, Typography, Avatar, Stack } from '@mui/material';
import axios from 'axios';

const MainPage = () => {
    const navigate = useNavigate();
    const username = sessionStorage.getItem('username');
    const expiration = sessionStorage.getItem('expiration');
    const timeRemaining = expiration - Math.floor(Date.now() / 1000);
    const [user, setUser] = useState({});
    const [userManagementVisible, setUserManagementVisible] = useState(false);
    const [subscriptionsVisible, setSubscriptionsVisible] = useState(false);
    const [moviesVisible, setMoviesVisible] = useState(false);
    const [time, setTime] = useState(timeRemaining);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/users/${username}`);
                setUser(response.data);
                const userString = JSON.stringify(response.data);
                sessionStorage.setItem('userOnline', userString);
                if (response.data.role === 'admin') {
                    setUserManagementVisible(true);
                    setSubscriptionsVisible(true);
                    setMoviesVisible(true);
                } else {
                    if (response.data.permissions.includes("View Subscriptions")) {
                        setSubscriptionsVisible(true);
                    }
                    if (response.data.permissions.includes("View Movies")) {
                        setMoviesVisible(true);
                    }
                };
            } catch (err) {
                console.error("Error: ", err.message);
            };
        };
        fetchUserData();
        const timeOutId = setTimeout(() => {
            navigate('/');
        }, timeRemaining * 1000);

        return () => {
            clearTimeout(timeOutId);
        }
    }, []);
    /**Timer */
    useEffect(() => {
        const interval = setInterval(() => {
            /*Calculate the time remaining */
            const timeRemaining = expiration - Math.floor(Date.now() / 1000);
            /*Update the state */
            setTime(timeRemaining);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    const logOutSubmit = async (event) => {
        navigate('/');
    };

    return (
        <Container>
            <AppBar position='static' color='default'>
                <Toolbar>
                    <IconButton size='small' edge="start"
                        color='inherit' aria-label='menu'
                        sx={{ mr: 70 }} disabled></IconButton>
                    <Stack direction='row' spacing={2}>
                        <Avatar src='/broken-image.jpg' />
                        <h3>{user.firstName + " " + user.lastName}</h3>
                        <Button sx={{ padding: 1, marginTop: 1 }}
                            variant='outlined' size='small' type='submit' color='primary'
                            onClick={logOutSubmit}>Log Out</Button>
                    </Stack>
                </Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 0.1, borderColor: "divider" }} >
                    {moviesVisible && <Button onClick={() => navigate(`/mainPage/movies2/moviesData2`)}>Movies</Button>}
                    {subscriptionsVisible && <Button onClick={() => navigate(`/mainPage/subscriptions/membersData`)}>Subscriptions</Button>}
                    {userManagementVisible && <Button onClick={() => navigate(`/mainPage/usersManagement/usersData`)}>Users Management</Button>}
                    <Button sx={{ paddingLeft: "430px" }} disabled onClick={() => navigate(`/mainPage/usersManagement/usersData`)}>Expiration time:{time} seconds</Button>
                </Typography>
            </AppBar>
            <Outlet />
        </Container>
    );
};

export default MainPage