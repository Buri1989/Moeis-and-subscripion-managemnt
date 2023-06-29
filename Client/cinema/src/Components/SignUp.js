import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { Button, TextField } from '@mui/material';
import axios from 'axios'


const SignUp = () => {
    const [userLogin, setUserLogin] = useState({ username: String, password: String });
    const [errorMessage, setErrorMessage] = useNavigate('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const object = { username: userLogin.username, password: userLogin.password }
        try {
            const { data: accessToken } = await axios.post('http://localhost:8000/users/signup', object);
            sessionStorage['accessToken'] = accessToken;
            navigate('/');
        } catch (err) {
            setErrorMessage(err.response.data.message);
        }
    }
    return (
        <Container>
            <h3>Create an Account</h3>
            <TextField label='User name' id='outlined-user-name'
                onChange={(event) => setUserLogin({ ...userLogin, username: event.target.value })} /><br /><br />
            <TextField label='Password' id='outlined-user-name'
                onChange={(event) => setUserLogin({ ...userLogin, password: event.target.value })} /><br />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <Button sx={{ padding: 1, marginTop: 2 }}
                variant='outlined' size="small" type='submit' color='primary'
                onClick={handleSubmit}>Create</Button>
        </Container>
    );
};

export default SignUp