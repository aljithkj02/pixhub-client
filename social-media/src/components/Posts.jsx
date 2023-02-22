import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button, useToast } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import config from '../config'
import { IndividualPost, Loader } from './index'
import { loadingOn, loadingOff } from '../redux/data/action';


  const Posts = ({ id }) => {
      const dispatch = useDispatch();
      const navigate = useNavigate();
      const toast = useToast()
      const { isLoading, error, data } = useQuery(['posts', id], async () => {
          const token = localStorage.getItem('token') || '';
          let res = await axios.get(`${config.API_URL}/api/posts/${id}`, {
            headers: {
              'authorization': `Bearer ${token}`
            }
          });
          // console.log(res.data.data);
          return res.data.data; 
      })
      if(error) {
        console.log(error.response.data.message)
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        toast({
            title: error.response.data.message || 'Something went wrong!',
            position: 'top',
            status: 'error',
            isClosable: true,
        })
      } 
  return (
    <Box display="flex" flexDir="column" gap="50px"> 
      { error ? <h1>Something went wrong!</h1>
        : isLoading? <Loader /> : data.map((post, i) => {
            return <IndividualPost key={i} post={ post } />
        })
      }
    </Box>
  )
}

export default Posts
