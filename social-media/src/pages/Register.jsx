import React, { useState } from 'react' 
import { Box, Text, Heading, Container, Card, CardHeader, CardBody, CardFooter, 
        Button, Input, useToast } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from '../redux/auth/action';
import config from '../config'

const Register = () => {
    const [ details, setDetails ] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast()

    const storeDetails = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    } 

    const register = async (e) => {
        e.preventDefault();
        if( details.password.length < 6){
            toast({
                title: "password must contains atleast 6 characters!",
                position: 'top',
                status: 'warning',
                isClosable: true,
            })
        }else{
            try {
                let res = await axios.post(`${config.API_URL}/api/auth/register`, {...details})
                if(res.data.success) {
                    const { token, id, name, img } = res.data;
                    localStorage.setItem('token', token);
                    toast({
                        title: res.data.message,
                        position: 'top',
                        status: 'success',
                        isClosable: true,
                    })
                    dispatch(login(name, id, token, img))
                    navigate('/');
                }
                console.log(res);
            } catch (err) {
                console.log(err.response.data.message);
                toast({
                    title: err.response.data.message,
                    position: 'top',
                    status: 'error',
                    isClosable: true,
                })
            }
        }
    }

  return (
    <Box h="100vh" bg="rgb(193, 190, 255)" display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" flexDirection={{ base:"column", md:"row"}} w={["90%","85%","80%", "60%"]} borderRadius="md" bg="white" minH="500px">
                
                <Card flex="1" p="20px" 
                    display="flex" justifyContent="center" alignItems="center"
                >
                        <Box p="20px">
                            <Heading size='md' fontSize="30px" color="#555">Register</Heading>
                            <form onSubmit={ register }>
                                <Input name="name" mt="6" type="text" variant='flushed' placeholder="Username" 
                                  onChange={ storeDetails } required={true}
                                /> 
                                <Input name="email" mt="6" type="email" variant='flushed' placeholder="Email" 
                                  onChange={ storeDetails } required={true}
                                /> 
                                <Input name="password" mt="6" type="password" variant='flushed' placeholder="Password" 
                                  onChange={ storeDetails } required={true}
                                /> 
                                <Button type="submit" mt="6"
                                    w="50%" bgColor="#938eef" color="white" fontWeight="bold" borderRadius="0" 
                                    _hover={{ bg: '#938ee1' }}
                                > Register </Button>
                            </form>
                            <Text display={["block", "block", "none"]} mt="5" fontSize="14px" fontWeight="400"> Do you have an account? 
                                <Link to="/login" style={{ fontSize:"15px", color: "blue", marginLeft: "10px"}}>
                                    Login
                                </Link>
                            </Text>
                        </Box>
                </Card>

                <Card flex="1" 
                    bgGradient="linear(to-b,rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5))"
                    bgImage="url('https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600')" 
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="cover" p="20px" color="white"
                     justifyContent="center" alignItems="center" display={{ base: "none", sm: "none", md: "flex"}}
                >
                    <CardHeader>
                        <Heading fontSize="80px" lineHeight="70px">Lama Social</Heading>
                    </CardHeader>
                    <CardBody >
                        <Text fontWeight="400">
                            View a summary of all your customers over the last month.
                            View a summary of all your customers over the last month
                        </Text>
                        <Text mt="5" fontSize="14px" fontWeight="400"> Do you have an account?</Text>
                        <Button colorScheme='gray' variant='solid' mt="5" color="rebeccapurple" fontWeight="bold"
                            w="50%" p="10px" border="none"  borderRadius="0" 
                            onClick={ ()=> navigate('/login') } 
                        >Login</Button>
                    </CardBody>
                </Card>
            </Box>
        </Box>
  )
}

export default Register
