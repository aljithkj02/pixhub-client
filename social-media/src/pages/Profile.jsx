import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text, Input, Image, useColorMode, Button, useDisclosure } from '@chakra-ui/react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import axios from 'axios';
import config from '../config'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import PinterestIcon from '@mui/icons-material/Pinterest'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import PlaceIcon from '@mui/icons-material/Place'
// import LanguageIcon from '@mui/icons-material/Language'
// import EmailOutLinedIcon from '@mui/icons-material/EmailOutLined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Posts, Update } from '../components'

const Profile = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { id } = useParams();
  const { id : user_id } = useSelector(data => data);
  const { isLoading, error, data } = useQuery('user', async () => {
    const token = localStorage.getItem('token') || '';
      let res = await axios.get(`${config.API_URL}/api/users/find/${id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
      });
      // console.log(res.data);
      return res.data.data;
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const queryClient = useQueryClient()

    const mutation = useMutation(async (user_id) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.get(`${config.API_URL}/api/users/follow/${user_id}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries("user")
        },
    })

  const handleFollow = async () => {
      mutation.mutate(id);
  }

  const handleUpdate = async () => {
    
  }

  return (
    <Box bgColor={ colorMode === 'light' ? "#f6f3f3" : "#333"}>
      { data && <Update isOpen={ isOpen } onOpen={ onOpen } onClose={ onClose } userData={ data }/> }
      <Box w="100%" h={["230px", "300px"]} position="relative">
        <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${data?.cover_pic}.jpg` }
          w="100%" h="100%" objectFit="cover"
        /> 
        <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${data?.profile_pic}.jpg` } 
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
            <Text fontSize="30px" fontWeight="500">{ data?.name }</Text>

            <Box display="flex" alignItems="center" justifyContent="space-around" w="100%">
              <Box display="flex" alignItems="center" gap="5px" >
                <FacebookTwoToneIcon />
                <Text fontSize="14px">{ data?.city } </Text>
              </Box>

              <Box>
                <Box display="flex" alignItems="center" gap="5px" >
                  <FacebookTwoToneIcon />
                  <Text fontSize="14px">social </Text>
                </Box>
              </Box>
            </Box>

            {
              (data?._id === user_id) ? (
                <Button size="md" colorScheme="twitter" fontWeight="400" p="10px 20px" fontSize="15px" border="none"
                  onClick= { onOpen }
                > 
                  update 
                </Button>
              ): (
                <Button size="md" colorScheme="twitter" fontWeight="400" p="10px 20px" fontSize="15px" border="none"
                  onClick= { handleFollow }
                > 
                    {data?.followers.includes(user_id)? "following" : "follow"}
                </Button>
              )
            }
        
          </Box>

          <Box flex="1" display="flex" alignItems="center" justifyContent="flex-end" gap="10px">
            {/* <EmailOutLinedIcon /> */}
            <MoreVertIcon />
          </Box>
        </Box>

        <Posts id={ id } />
      </Box>

    </Box>
  )
}

export default Profile
