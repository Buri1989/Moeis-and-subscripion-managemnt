import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { Button, AppBar, TextField } from '@mui/material';
import axios from 'axios';


const Login = () => {
    const [userLogin, setUserLogin] = useState({ username: String, password: String });
    const [errorMessage, setErrorMessage] = useNavigate('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        try {
            const response = await axios.get('http://localhost:8000/users/signin', userLogin);
            const { accessToken, expiration } = response.data;
            sessionStorage['username'] = userLogin.username;
            sessionStorage['accessToken'] = accessToken;
            sessionStorage['expiration'] = expiration;
            navigate(`/mainPage/imageComponent`);
        } catch (err) {
            setErrorMessage(err.response.data.message);
        };
    };
    return (
        <Container>
            <AppBar position='static' color='default'></AppBar>
            <h3>Login Page</h3>
            <TextField label='User name' id='outlined-user-name'
                onChange={(event) => setUserLogin({ ...userLogin, username: event.target.value })} /><br /><br />
            <TextField label='Password' id='outlined-user-name'
                onChange={(event) => setUserLogin({ ...userLogin, password: event.target.value })} /><br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Button sx={{ padding: 1, marginTop: 2 }}
                variant='outlined' size="small" type='submit' color='primary'
                onClick={handleSubmit}>Login</Button>
            <h3>New User? : {<Link to={`signUp`}>Create Account</Link>}</h3>
        </Container>
    );
};

export default Login;
