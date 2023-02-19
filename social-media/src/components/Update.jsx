import React, { useState } from 'react'
import { Box, Text, Input, Image, useColorMode, Button, Modal, 
  ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios';
import config from '../config'

const Update = ({ isOpen, onOpen, onClose, userData }) => {

    const { name, city, website } = userData;
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [data, setData ] = useState({
        name: name,
        city: city,
        website: website
    })

    const queryClient = useQueryClient()

    const mutation = useMutation(async (newData) => {
        const token = localStorage.getItem('token') || '';
        let res = await axios.post(`${config.API_URL}/api/users/update`, newData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        // console.log(res);
    }, {
        onSuccess: () => {
          queryClient.invalidateQueries('user')
        },
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const updateData = async (e) => {
        e.preventDefault();
        storeImageAndUpdate();
        onClose();
    }

    const storeImageAndUpdate = async () => {
        const signatureResponse = await axios.get(`${config.API_URL}/get-signature`);
        let imgDatas = [];
        if(cover){
            const data = new FormData()
            data.append("file", cover)
            data.append("api_key", config.CLOUD_API_KEY)
            data.append("signature", signatureResponse.data.signature)
            data.append("timestamp", signatureResponse.data.timestamp)
          
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/auto/upload`, data, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
                onUploadProgress: function (e) {
                    // console.log(e.loaded / e.total)
                }
            })
            console.log(cloudinaryResponse.data)
          
            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
            }
            imgDatas.push({ type: 'cover', data:  photoData });
        }
        if(profile){
            const data = new FormData()
            data.append("file", profile)
            data.append("api_key", config.CLOUD_API_KEY)
            data.append("signature", signatureResponse.data.signature)
            data.append("timestamp", signatureResponse.data.timestamp)
        
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/${config.CLOUD_NAME}/auto/upload`, data, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
                onUploadProgress: function (e) {
                    // console.log(e.loaded / e.total)
                }
            })
            console.log(cloudinaryResponse.data)
        
            const photoData = {
                public_id: cloudinaryResponse.data.public_id,
                version: cloudinaryResponse.data.version,
                signature: cloudinaryResponse.data.signature
            }
            imgDatas.push({ type: 'profile', data : photoData });
        }
        mutation.mutate({...data, images: imgDatas});
    }
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update profile</ModalHeader>
          <ModalCloseButton />
            <form onSubmit={ updateData }>
                <ModalBody>
                        <Input type="file" onChange={ (e) => setCover(e.target.files[0]) } />
                        <Input type="file" onChange={ (e) => setProfile(e.target.files[0]) } />
                        <Input type="text" value={ data.name } name="name" onChange={ handleChange }
                            placeholder="Name"
                        />
                        <Input type="text" value={ data.city } name="city" onChange={ handleChange }
                            placeholder="City"
                        />
                        <Input type="text" value={ data.website } name="website" onChange={ handleChange }
                            placeholder="Website"
                        />
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button type="submit" colorScheme='blue'>Update</Button>
                </ModalFooter>
            </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Update
