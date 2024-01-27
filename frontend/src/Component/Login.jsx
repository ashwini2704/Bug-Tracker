import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom';
import { authContext } from '../Context/Authcontext.jsx';

const Login = () => {
  const [formData, setData] = useState({
    email:"",
    password:""
  });

  const { dispatch } = useContext(authContext);

  const handlleChange = (e) => {
    setData({...formData, [e.target.name] : e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/login",{
        method:'post',
        headers : {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const result = await res.json();

      if(!res.ok) {
        throw new Error(result.message)
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: result.data,
          token: result.token,
        }
      });
      console.log(result)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="flex flex-col m-auto ">
      <div className="flex flex-col m-auto w-96 border-solid border-2 border-gray-400 p-9">
        <h3 className=' my-5 py-3 text-red-500 font-bold text-xl'>Hello! <span className='wel'>Welcome</span> Back 🎉</h3>
        <form className='form' onSubmit={submitHandler}>
          <div className='flex flex-col'>
            <input className='my-2 py-1' type="email" value={formData.email} placeholder='Enter Your Email' name='email' onChange={handlleChange} required/>
            <input className='my-2 py-1' type="password" value={formData.password} placeholder='Enter Your Password' name='password' onChange={handlleChange} required/>
            <button className='bg-red-500 my-5 py-3 text-white font-bold text-xl'  type='submit'>
             Login
            </button>
            <p>Don't have an account? <Link className='text-blue-500 underline' to="/signup">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
