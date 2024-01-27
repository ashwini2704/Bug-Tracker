import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Bug from './Bug'
import { Signup } from './Signup'

const AllRoutes = () => {
  return (
      <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/bug' element={<Bug/>} />
      </Routes>
  )
}

export default AllRoutes