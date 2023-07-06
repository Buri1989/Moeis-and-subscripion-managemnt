import { Container } from '@mui/system'
import { Button, Checkbox, TextField, FormGroup, FormControlLabel, Card, CardMedia, CardContent } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'

function AddUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstName: String,
        lastName: String,
        username: String,
        sessionTimeOut: Number,
        createdData: new Date().toLocaleDateString('en-CA'),
        permissions: []
    });
    const [checkboxValues, setCheckboxValues] = useState([]);
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        const permissions = checkboxValues;
        let newUser = { ...userData, permissions };
        const response = await axios.post('http://localhost:8000/users', newUser)
        newUser = {
            id: response.data,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            username: newUser.username,
            sessionTimeOut: newUser.sessionTimeOut,
            createdData: newUser.createdData,
            permissions: [newUser.permissions],
        };
        dispatch({ type: 'ADDUSER', payload: newUser });

        /*Update movie in DB 'http://localhost:8888/movies'*/
        navigate(`/mainPage/usersManagement/usersData`)
    }
    return (
        <Container>
            <Card sx={{ padding: 1, marginTop: 2, background: '#B4C9C7', width: 500 }} elevation={3}>
                <CardMedia height="200"><h2 style={{ fontFamily: 'Comic Sans MS', color: '#4a6baf' }}>Add new user</h2></CardMedia>
                <CardContent>
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label=' First Name' id='outlined-first-name'
                        onChange={(event) => setUserData({ ...userData, firstName: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label=' Last Name' id='outlined-last-name'
                        onChange={(event) => setUserData({ ...userData, lastName: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label=' User Name' id='outlined-last-name'
                        onChange={(event) => setUserData({ ...userData, username: event.target.value })} /><br />
                    <TextField sx={{ padding: 1, marginTop: 0.5 }}
                        required label='Session Time Out (minutes)' id='outlined-session-time-out'
                        onChange={(event) => setUserData({ ...userData, sessionTimeOut: event.target.value })} /><br />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox value='View Subscriptions'
                            checked={checkboxValues.includes('View Subscriptions') ||
                                (checkboxValues.includes('Create Subscriptions') && !checkboxValues.includes('View Subscriptions')) ||
                                (checkboxValues.includes('Delete Subscriptions') && !checkboxValues.includes('View Subscriptions')) ||
                                (checkboxValues.includes('Update Subscriptions') && !checkboxValues.includes('View Subscriptions'))
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
                                (checkboxValues.includes('Create Movies') && !checkboxValues.includes('View Movies')) ||
                                (checkboxValues.includes('Delete Movies') && !checkboxValues.includes('View Movies')) ||
                                (checkboxValues.includes('Update Movies') && !checkboxValues.includes('View Movies'))}
                            onChange={handleCheckboxChange} />} label='View Movies' />
                        <FormControlLabel control={<Checkbox value='Create Movies'
                            onChange={handleCheckboxChange} />} label='Create Movies' />
                        <FormControlLabel control={<Checkbox value='Delete Movies'
                            onChange={handleCheckboxChange} />} label='Delete Movies' />
                        <FormControlLabel control={<Checkbox value='Update Movies'
                            onChange={handleCheckboxChange} />} label='Update Movies' />
                    </FormGroup>
                    <Button sx={{ padding: 1, marginTop: 2 }} variant='outlined' type='submit'
                        onClick={handleSubmit}>Save</Button>
                    <Button sx={{ padding: 1, marginTop: 2, marginLeft: 2 }} variant='outlined' type='submit'
                        onClick={() => navigate('/mainPage/usersManagement/usersData')}>Cancel</Button>
                </CardContent>
            </Card>
        </Container>
    );
}
export default AddUser;