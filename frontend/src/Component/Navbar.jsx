import React, { useContext } from 'react'
import { authContext } from '../Context/Authcontext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuth,user } = useContext(authContext);
const navigate = useNavigate()
  return (
    <div className='flex justify-evenly mb-8'>
      <div>
        <h1 onClick={() =>navigate('/')} className='text-xl text-red-700 ml-6'>Buggies</h1>
      </div>
      <div>
        {
          isAuth ? <div>
            <h4>{user.name}</h4>
            <Link to={'/logout'}>Logout</Link>
          </div> : <Link to={'/login'}>Login</Link>
        }
      </div>
    </div>
  )
}

export default Navbar