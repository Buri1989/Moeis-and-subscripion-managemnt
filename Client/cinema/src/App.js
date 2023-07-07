import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import MainPage from './Components/MainPage';
import Movies2 from './Components/Movies2';
import Subscriptions from './Components/Subscriptions';
import UsersManagement from './Components/UsersManagement';
import AddUser from './Components/AddUser';
import UsersData from './Components/UsersData';
import GetFromDBToRedux from './Store/GetFromDBToRedux';
import EditUser from './Components/EditUser';
import EditMovie from './Components/EditMovie';
import AddMovie from './Components/AddMovie';
import EditMember from './Components/EditMember';
import MembersData from './Components/MembersData';
import AddMember from './Components/AddMember';
import SubscribeToNewMovie from './Components/SubscribeToNewMovie';
import ImageComp from './Components/ImageComp';
import MoviesData2 from './Components/MoviesData2'

const App = () => {
  return (
    <div className='App'>
      <GetFromDBToRedux />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='mainPage' element={<MainPage />} >
          <Route path='ImageComp' element={<ImageComp />} />
          <Route path='movies2' element={<Movies2 />}>
            <Route path='editMovie' element={<EditMovie />} />
            <Route path='movieData2' element={<MoviesData2 />} />
            <Route path='addNewMovie' element={<AddMovie />} />
          </Route>
          <Route path='subscriptions' element={<Subscriptions />}>
            <Route path='memberData' element={<MembersData />}>
              <Route path='subscribeToNewMovie' element={<SubscribeToNewMovie />} />
            </Route>
            <Route path='editMember' element={<EditMember />} />
            <Route path='addNewMember' element={<AddMember />} />
          </Route>
          <Route path='usersManagement' element={<UsersManagement />}>
            <Route path='addNewUser' element={<AddUser />} />
            <Route path='userData' element={<UsersData />} />
            <Route path='editUser' element={<EditUser />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}




export default App;
