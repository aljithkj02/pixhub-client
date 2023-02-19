import React, { useState } from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import { useSelector } from 'react-redux'
import axios from 'axios';
import config from '../config'


const AddPost = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState(null);
    
    const { name } = useSelector(data => data);
    const queryClient = useQueryClient()

    const mutation = useMutation(async (newPost) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.post(`${config.API_URL}/api/posts`, newPost, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        console.log(res);
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries('posts')
        },
    })

    const share = () => {
        storeImageAndPost();
    }

    const storeImageAndPost = async () => {
        const signatureResponse = await axios.get(`${config.API_URL}/get-signature`)

        const data = new FormData()
        data.append("file", file)
        data.append("api_key", config.CLOUD_API_KEY)
        data.append("signature", signatureResponse.data.signature)
        data.append("timestamp", signatureResponse.data.timestamp)
      
        const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/auto/upload`, data, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: function (e) {
            // console.log(e.loaded / e.total)
          }
        })
        // console.log(cloudinaryResponse.data)
      
        // send the image info back to our server
        const photoData = {
          public_id: cloudinaryResponse.data.public_id,
          version: cloudinaryResponse.data.version,
          signature: cloudinaryResponse.data.signature
        }
        
        mutation.mutate({desc, ...photoData});
    }
    
  return (
    <Box borderRadius="20px" m="20px 0" bgColor={colorMode == 'light' ? "white" : "#222" } boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
        <Box p="20px" >
            <Box display="flex" gap="30px" alignItems="center">
                <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?aut%E2%80%A6"
                h="40px" w="40px" borderRadius="50%" objectFit="cover" />
                <Text fontSize="15px">What's on your mind {name}?</Text>
            </Box>

            <Box m="10px 0">
                <Input variant="flushed" type="text" onChange={ (e) => setDesc(e.target.value )}/>
            </Box>

            <Box m="10px 0" display="flex" justifyContent="space-between" alignItems="center" mt="20px">
                <Input variant="flushed" type="file"id="file" display="none" 
                    onChange={(e) => setFile(e.target.files[0])} 
                />
                <label htmlFor="file">
                    <Box display="flex" alignItems="center" gap="10px">
                        <Image src="https://github.com/safak/youtube2022/blob/social-app/client/src/assets/img.png?raw=true" 
                            w="30px"
                        />
                        <Text fontSize="14px">Add image</Text>
                    </Box>
                </label>
                <Button onClick={ share } colorScheme='blue' size="sm">Share</Button>
            </Box>
        </Box>
    </Box>
  )
}

export default AddPost
