import React from 'react'
import {  Button, useColorMode, Box } from '@chakra-ui/react'
import { Stories, Posts } from '../components'

const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "#f6f3f3" : "#333";
  return (
    <Box bgColor={ bg } p={["10px 10px", "10px 20px", "20px 50px"]}>
      <Stories />
      <Posts />
    </Box>
  )
}

export default Home
