import React from 'react'
import { Box, Text, Input, Image, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "white" : "black";
  const border = (colorMode === 'light') ? "1px solid lightGrey" : "1px solid #444";
  const { name } = useSelector(data => data);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p="10px 20px" h="60px"
      borderBottom={border} position="sticky" top="0" zIndex={2} bgColor={ bg }
    >
      <Box display="flex" alignItems="center" gap="30px">
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', color: (colorMode === 'light') ?'darkblue' : 'white' }}>
            Lama Social
        </Link>
        <HomeOutlinedIcon />

        {
          (colorMode === 'light') ? <DarkModeOutlinedIcon onClick={ toggleColorMode } /> :
          <WbSunnyOutlinedIcon  onClick={ toggleColorMode } />
        }
        
        <GridViewOutlinedIcon />
        <Box display="flex" alignItems="center" gap="10px" border={ border } borderRadius="5px" p="5px">
          <SearchOutlinedIcon />
          <Input display={["none", "none", "block"]} type="text" placeholder="Search..." border="none" 
          outline="none"  size="xs"  w={["200px", "500px"]} />
        </Box>
      </Box>

      <Box display={["none", "none", "flex"]} gap="20px" alignItems="center" objectFit="cover">
        <PersonOutlineOutlinedIcon />
        {/* <EmailOutlinedIcon /> */}
        <NotificationsNoneOutlinedIcon />
        
        <Box display={["none", "none", "none", "flex"]} alignItems="center" gap="10px">
          <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" 
            w="30px" h="30px" borderRadius="50%"
          />
          <Text fontWeight="500"> {name}</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
