import React, { useState } from 'react'
import { Box, Text, Input, Image, useColorMode, useToast } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import config from '../config'
import { logout } from '../redux/auth/action';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = (colorMode === 'light') ? "white" : "black";
  const border = (colorMode === 'light') ? "1px solid lightGrey" : "1px solid #444";
  const { name, img, id } = useSelector(data => data.auth);
  const [logoutBox, setLogoutBox] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast()

  const profileHandler = () => {
      navigate(`/profile/${id}`);
      setLogoutBox(false);
  }

  const logoutUser = () => {
    dispatch(logout());
    toast({
        title: "Logged out successfully!",
        position: 'top',
        status: 'success',
        isClosable: true,
    })
    navigate('/login');
  }

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" p="10px 20px" h="60px"
      borderBottom={border} position="sticky" top="0" zIndex={2} bgColor={ bg }
    >
      <Box display="flex" alignItems="center" gap="30px">
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', color: (colorMode === 'light') ?'darkblue' : 'white' }}>
            Lama Social
        </Link>

        <HomeOutlinedIcon onClick={ ()=> navigate('/')}/>

        {
          (colorMode === 'light') ? <DarkModeOutlinedIcon onClick={ toggleColorMode } /> :
          <WbSunnyOutlinedIcon  onClick={ toggleColorMode } />
        }
        
        <GridViewOutlinedIcon />
        <Box display="flex" alignItems="center" gap="10px" border={ border } borderRadius="5px" p="5px">
          <SearchOutlinedIcon />
          <Input display={["none", "none", "block"]} type="text" placeholder="Search..." border="none" 
          outline="none"  size="xs"  w={["200px", "300px", "300px", "500px"]} />
        </Box>
      </Box>

      <Box display={["flex"]} gap="20px" alignItems="center" objectFit="cover">
        <PersonOutlineOutlinedIcon onClick={ ()=> setLogoutBox(!logoutBox)}  cursor="pointer"/>

        <Box display={["none", "none", "flex"]} cursor="pointer">
          <NotificationsNoneOutlinedIcon />
        </Box>
        
        <Box display={["none", "none", "none", "flex"]} alignItems="center" gap="10px" 
          onClick={ ()=> setLogoutBox(!logoutBox)} cursor="pointer"
        >
          <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${img}.jpg`} 
            w="30px" h="30px" borderRadius="50%" 
          />
          <Text fontWeight="500" > {name}</Text>
        </Box>

        {
            logoutBox && (
              <Box position="absolute" top="60px" right="0px" p="20px" bgColor={(colorMode === 'light') ?'white' : 'black' } zIndex="5"
                boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" w="150px" borderRadius="10px"
              >
                <Text cursor="pointer" pb="5px" transition=".2s ease" _hover={{ color: '#1da1f2'}}
                  fontWeight="500" borderBottom="1px solid #bab9b6"
                  onClick={ profileHandler }
                >Profile</Text>
                <Text cursor="pointer" pt="5px" transition=".2s ease" _hover={{ color: '#1da1f2'}}
                  fontWeight="500" onClick={ logoutUser }
                >Logout</Text>
              </Box>
            )
          }

      </Box>
    </Box>
  )
}

export default Navbar
