import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import PinterestIcon from '@mui/icons-material/Pinterest'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import PlaceIcon from '@mui/icons-material/Place'
// import LanguageIcon from '@mui/icons-material/Language'
import EmailOutLinedIcon from '@mui/icons-material/EmailOutLined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Posts } from '../components'

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bgColor={ colorMode === 'light' ? "#f6f3f3" : "#333"}>
      <Box w="100%" h={["230px", "300px"]} position="relative">
        <Image src="https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg?auto=compress&cs=tinysrgb&w=600" 
          w="100%" h="100%" objectFit="cover"
        />
        <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" 
          w={["150px", "200px"]} h={["150px", "200px"]} borderRadius="50%" objectFit="cover" position="absolute" left="0" right="0" m="auto"
          top={["150px", "200px"]}
        />
      </Box>

      <Box p={["10px 10px", "20px 50px"]} m={["80px 0", "0"]}>  
        <Box  bgColor={ colorMode === 'light' ? "white" : "#222"} h="280px" borderRadius="20px" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"  
          p="20px 50px" display="flex" alignItems="center" justifyContent="space-between" mb="20px"
          flexDir={["column", "row"]}
        >
          <Box flex="1" display="flex" gap="10px">
            <a href="">
              <FacebookTwoToneIcon fontSize="large"/>
            </a>
            <a href="">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
          </Box>

          <Box flex="1" display="flex" flexDir="column" alignItems="center" gap="10px">
            <Text fontSize="30px" fontWeight="500">Jithu</Text>

            <Box display="flex" alignItems="center" justifyContent="space-around" w="100%">
              <Box display="flex" alignItems="center" gap="5px" >
                <FacebookTwoToneIcon />
                <Text fontSize="14px">USA </Text>
              </Box>

              <Box>
                <Box display="flex" alignItems="center" gap="5px" >
                  <FacebookTwoToneIcon />
                  <Text fontSize="14px">social </Text>
                </Box>
              </Box>
            </Box>

            <Button size="md" colorScheme="twitter" fontWeight="400" p="10px 20px" fontSize="15px" border="none"
            > 
              follow 
            </Button>
        
          </Box>

          <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end" gap="10px">
            <EmailOutLinedIcon />
            <MoreVertIcon />
          </Box>
        </Box>

        <Posts />
      </Box>

    </Box>
  )
}

export default Profile
