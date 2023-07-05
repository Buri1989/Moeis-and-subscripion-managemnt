import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import { Button, TextField, FormGroup, Checkbox, FormControlLabel, Card, CardMedia, CardContent } from '@mui/material';
import axios from 'axios';


const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const person = location.state.person;
    const [userData, setUserData] = useState({
        firstName: String(person.firstName),
        lastName: String(person.lastName),
        username: String(person.username),
        sessionTimeOut: Number(person.sessionTimeOut),
        createdData: String(person.createdData),
        permissions: [person.permissions]
    });
    const [checkboxValues, setCheckboxValues] = useState(person.permissions);
    const handleSubmit = async (event) => {
        event.preventDefault();
        /*Update user in DB and make a message */
        const permissions = checkboxValues;
        let newUser = { ...userData, permissions };
        await axios.put(`${'http://localhost:8000/users'}/${person.id}`, newUser)
        newUser = {
            id: person.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: person.username,
            sessionTimeOut: newUser.sessionTimeOut,
            createdData: person.createdData,
            permissions: [newUser.permissions],
        };
        dispatch({ type: 'UPDATEUSER', payload: newUser });
        /*Update movie in DB 'http://localhost:8888/movies' */
        navigate(`/mainPage/usersManagement/usersData`);
    }
    const handleCheckboxChange = (event) => {
        if (!checkboxValues.includes(event.target.value)) {
            /*If the checkbox is checked,add value to the array */
            setCheckboxValues(prevValues => [...prevValues, event.target.value]);
            if (event.target.value === 'Create Subscriptions' && !checkboxValues.includes('View Subscriptions') ||
                event.target.value === 'Delete Subscriptions' && !checkboxValues.includes('View Subscriptions') ||
                event.target.value === 'Update Subscriptions' && !checkboxValues.includes('View Subscriptions')) {
                setCheckboxValues(prevValues => [...prevValues, 'View Subscriptions']);
            } else if (event.target.value === 'Create Movies' && !checkboxValues.includes('View Movies') ||
                event.target.value === 'Delete Movies' && !checkboxValues.includes('View Movies') ||
                event.target.value === 'Update Movies' && !checkboxValues.includes('View Movies')) {
                setCheckboxValues(prevValues => [...prevValues, 'View Movies']);
            }
        } else {
            /*If the checkbox is not checked, remove the value from the array */
            if (event.target.value === 'View Movies') {
                if (!checkboxValues.includes('Create Movies') &&
                    !checkboxValues.includes('Delete Movies') &&
                    !checkboxValues.includes('Update Movies')) {
                    setCheckboxValues(prevValues => prevValues.filter(value => value !== 'View Movies'));
                }
            } else if (event.target.value === 'View Subscriptions') {
                if (!checkboxValues.includes('Create Subscriptions') &&
                    !checkboxValues.includes('Delete Subscriptions') &&
                    !checkboxValues.includes('Update Subscriptions')) {
                    setCheckboxValues(prevValues => prevValues.filter(value => value !== 'View Subscriptions'))
                }
            } else {
                setCheckboxValues(prevValues => prevValues.filter(value => value !== event.target.value))
            }
        }
        userData.permissions = checkboxValues;
    };

    return (
        <Container>
            <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
                <CardMedia height="200"><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Edit User</h2></CardMedia>
                <CardContent>
                    <TextField sx={{ padding: 1, marginTop: 2 }}
                        disabled={true} required label='User Name' id='outlined-user-name'
                        defaultValue={person.username}
                        onChange={(event) => setUserData({ ...userData, username: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2 }}
                        required label='First Name' id='outlined-first-name'
                        defaultValue={person.firstName}
                        onChange={(event) => setUserData({ ...userData, firstName: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2 }}
                        required label='Last Name' id='outlined-last-name'
                        defaultValue={person.lastName}
                        onChange={(event) => setUserData({ ...userData, lastName: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2 }}
                        required label='Session time out' id='outlined-session-time-out'
                        defaultValue={person.sessionTimeOut}
                        onChange={(event) => setUserData({ ...userData, sessionTimeOut: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 2 }}
                        disabled={true} required label='Created Data' id='outlined-created-data'
                        defaultValue={person.createdData}
                        onChange={(event) => setUserData({ ...userData, createdData: event.target.value })} /><br />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value='View Subscriptions'
                            checked={checkboxValues.includes('View Subscriptions') ||
                                (checkboxValues.includes("Create Subscriptions") && !checkboxValues.includes("View Subscriptions")) ||
                                (checkboxValues.includes("Delete Subscriptions") && !checkboxValues.includes("View Subscriptions")) ||
                                (checkboxValues.includes("Update Subscriptions") && !checkboxValues.includes("View Subscriptions"))
                            } onChange={handleCheckboxChange} />} label='View Subscriptions' />
                        <FormControlLabel control={<Checkbox value='Create Subscriptions'
                            checked={checkboxValues.includes('Create Subscriptions')}
                            onChange={handleCheckboxChange} />} label='Create Subscriptions' />
                        <FormControlLabel control={<Checkbox value='Delete Subscriptions'
                            checked={checkboxValues.includes('Delete Subscriptions')}
                            onChange={handleCheckboxChange} />} label='Delete Subscriptions' />
                        <FormControlLabel control={<Checkbox value='Update Subscriptions'
                            checked={checkboxValues.includes('Update Subscriptions')}
                            onChange={handleCheckboxChange} />} label='Update Subscriptions' />
                        <FormControlLabel control={<Checkbox value='View Movies'
                            checked={checkboxValues.includes('View Movies') ||
                                (checkboxValues.includes("Create Movies") && !checkboxValues.includes("View Movies")) ||
                                (checkboxValues.includes("Delete Movies") && !checkboxValues.includes("View Movies")) ||
                                (checkboxValues.includes("Update Movies") && !checkboxValues.includes("View Movies"))}
                            onChange={handleCheckboxChange} />} label='View Movies' />
                        <FormControlLabel control={<Checkbox value='Create Movies'
                            checked={checkboxValues.includes('Create Movies')}
                            onChange={handleCheckboxChange} />} label='Create Movies' />
                        <FormControlLabel control={<Checkbox value='Delete Movies'
                            checked={checkboxValues.includes('Delete Movies')}
                            onChange={handleCheckboxChange} />} label='Delete Movies' />
                        <FormControlLabel control={<Checkbox value='Update Movies'
                            checked={checkboxValues.includes('Update Movies')}
                            onChange={handleCheckboxChange} />} label='Update Movies' />
                    </FormGroup>
                    <Button sx={{ padding: 1, marginTop: 2 }} variant='outlined'
                        type='submit' onClick={handleSubmit}>Update</Button>
                    <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant='outlined'
                        type='submit' onClick={() => navigate('/mainPage/usersManagement/usersData')}>Cancel</Button>
                </CardContent>
            </Card>
        </Container>
    )
}

export default EditUser