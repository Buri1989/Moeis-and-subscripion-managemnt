import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const GetFromDBToRedux = () => {
    const moviesUrl = 'http://localhost:8888/movies';
    const memberUrl = 'http://localhost:8888/members';
    const subscriptionsURL = 'http://localhost:8888/subscriptions';
    const usersURL = 'http://localhost:8000/users';
    const dispatch = useDispatch(); /*Save data in the store */
    useEffect(() => {
        /*Get movies data from the subscriptionsWS */
        const fetchDataFromMoviesDB = async () => {
            const { data: moviesDB } = await axios.get(moviesUrl);
            dispatch({ type: 'LOADMOVIES', payload: moviesDB });
        }
        fetchDataFromMoviesDB();
        /*Get subscriptions data from the subscriptionsWS */
        const fetchDataFromSubscriptionsDB = async () => {
            const { data: subscriptionsDB } = await axios.get(subscriptionsURL);
            dispatch({ type: 'LOADSUBSCRIPTIONS', payload: subscriptionsDB });
        }
        fetchDataFromSubscriptionsDB();
        /*Get members data from the subscriptionsWS */
        const fetchDataFromMembersDB = async () => {
            const { data: membersDB } = await axios.get(memberUrl);
            dispatch({ type: 'LOADMEMBERS', payload: membersDB });
        }
        fetchDataFromMembersDB();
        /*Get users data from the CinemaWS */
        const fetchDataFromUsers = async () => {
            const { data: usersData } = await axios.get(usersURL);
            dispatch({ type: 'LOADUSERS', payload: usersData });
        }
        fetchDataFromUsers();
    }, []);
};

export default GetFromDBToRedux
