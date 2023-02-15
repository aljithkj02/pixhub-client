import React from 'react'
import { Box } from '@chakra-ui/react'
import { Navbar, LeftBar, RightBar } from '../components'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Login, Register, Home, Profile } from '../pages'
import PrivateRouter from './PrivateRouter'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Box display="flex">
                <LeftBar />
                <Outlet />
                <RightBar />
            </Box>
        </div>
    )
}

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <PrivateRouter> <Layout /> </PrivateRouter> } >
            <Route path="" element={ <Home /> }/>
            <Route path="profile/:id" element={ <Profile /> }/>
        </Route>
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </div>
  )
}

export default AllRoutes
