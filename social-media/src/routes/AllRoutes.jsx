import React from 'react'
import { Box, Container } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'
import { Navbar, LeftBar, RightBar } from '../components'
import { Routes, Route, Outlet } from 'react-router-dom'
import { Login, Register, Home, Profile } from '../pages'
import PrivateRouter from './PrivateRouter'

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Container maxW="full" display="flex" >
                <LeftBar />
                <Box flex="6">
                  <Outlet />
                </Box>
                <RightBar />
            </Container>
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
