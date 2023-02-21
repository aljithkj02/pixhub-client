import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import config from '../config'
import { IndividualPost, Loader } from './index'
import { loadingOn, loadingOff } from '../redux/data/action';


// const posts = [
//     {
//       id: 1,
//       name: "John Doe",
//       userId: 1,
//       profilePic:
//         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
//     {
//       id: 2,
//       name: "Jane Doe",
//       userId: 2,
//       profilePic:
//         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
//       desc: "Tenetur iste voluptates dolorem rem commodi voluptate pariatur, voluptatum, laboriosam consequatur enim nostrum cumque! Maiores a nam non adipisci minima modi tempore.",
//       img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
// ];


  const Posts = ({ id }) => {
      const dispatch = useDispatch();
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
