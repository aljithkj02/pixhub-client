import React from 'react'
import { Box, Text, Input, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p="10px 20px" h="50px"
      borderBottom="1px solid lightGrey" position="sticky" top="0" bgColor="white"
    >
      <Box display="flex" alignItems="center" gap="30px">
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', color: 'darkblue'}}>
            Lama Social
        </Link>
        <HomeOutlinedIcon />
        <DarkModeOutlinedIcon />
        <GridViewOutlinedIcon />
        <Box display="flex" alignItems="center" gap="10px" border="1px solid lightgrey" borderRadius="5px" p="5px">
          <SearchOutlinedIcon />
          <Input type="text" placeholder="Search..." border="none" w="500px" size="xs" />
        </Box>
      </Box>

      <Box display="flex" gap="20px" alignItems="center" objectFit="cover">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsNoneOutlinedIcon />
        
        <Box display="flex" alignItems="center" gap="10px">
          <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" 
            w="30px" h="30px" borderRadius="50%"
          />
          <Text fontWeight="500"> Aljith K J</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
