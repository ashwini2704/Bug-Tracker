import React, { useContext } from 'react'
import { authContext } from '../Context/Authcontext';
import Bug from './Bug';
import Login from './Login';

const Home = () => {
      const { isAuth } = useContext(authContext);
  return (
    <div>
      {
            isAuth ? <Bug/> : <Login/>
      }
    </div>
  )
}

export default Home