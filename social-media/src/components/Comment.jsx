import React, { useState } from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import moment from 'moment'
import axios from 'axios';
import config from '../config'

// const comments = [
//     {
//       id: 1,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
//       name: "John Doe",
//       userId: 1,
//       img:
//         "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 2,
//       desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
//       name: "Jane Doe",
//       userId: 2,
//       img:
//         "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     },
// ];

const IndividualComment = ({ commentData }) => {
    const { user_img, user_name, comment, createdAt } = commentData;
    return(
        <Box m="30px 0" display="flex" justifyContent="space-between" gap="20px">
            <Image src={`https://res.cloudinary.com/${config.CLOUD_NAME}/image/upload/${user_img}.jpg`} w="40px" h="40px" borderRadius="50%" objectFit="cover" />
            <Box display="flex" flexDir="column" gap="3px" flex="5" alignItems="flex-start">
                <Text  fontWeight="500"> { user_name } </Text>
                <Text > { comment } </Text>
            </Box>
            <Text flex="1" alignSelf="center" color="grey" fontSize="14px"> { moment(createdAt).fromNow() } </Text>
        </Box>
    )
}

  const Comment = ({ postId }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const border = (colorMode === 'light') ? "1px solid lightgray" : "1px solid #444";
    
    const [ comment, setComment ] = useState();

    const { isLoading, error, data } = useQuery('comments', async () => {
      const token = localStorage.getItem('token') || '';
        let res = await axios.get(`${config.API_URL}/api/comments/${postId}`, {
          headers: {
            'authorization': `Bearer ${token}`
          }
        });
        return res.data.data;
    })

    const queryClient = useQueryClient()

    const mutation = useMutation(async (newComment) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.post(`${config.API_URL}/api/comments/${postId}`, newComment, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        console.log(res);
    }, {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries('comments')
        },
    })

    const addComment = () => {
      mutation.mutate({comment: comment});
      setComment('');
    }
  return (
    <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="20px" m="20px 0">
            <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" 
                w="40px" h="40px" borderRadius="50%" objectFit="cover" 
            />
            <Input value={ comment } flex="5" type="text" placeholder="write a comment..." border={border} 
              onChange={ (e)=> setComment( e.target.value ) }
            />
            <Button border="none" bgColor="#5271ff" color="white" p="10px 20px"
              onClick={ addComment }
            >Send</Button>
        </Box>
       {
        isLoading ? <h1>Loading...</h1> : data.map((comment, i) => {
            return <IndividualComment key={i} commentData={comment} />
        })
       }
    </Box>
  )
}

export default Comment
