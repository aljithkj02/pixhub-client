import React from 'react'
import { Box, Text, Heading, Container, Card, CardHeader, CardBody, CardFooter, 
        Button, Input } from '@chakra-ui/react'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
  return (
        <Box h="100vh" bg="rgb(193, 190, 255)" display="flex" alignItems="center" justifyContent="center">
            <Box display="flex" flexDirection={{ base:"column", md:"row"}} w={["90%","85%","80%", "60%"]} borderRadius="md" bg="white" minH="500px">
                <Card flex="1" 
                    bgGradient="linear(to-b,rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5))"
                    bgImage="url('https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=600')" 
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="cover" p="20px" color="white"
                     justifyContent="center" alignItems="center" display={{ base: "none", sm: "none", md: "flex"}}
                >
                    <CardHeader>
                        <Heading fontSize="80px" lineHeight="70px">Hello world</Heading>
                    </CardHeader>
                    <CardBody >
                        <Text fontWeight="400">
                            View a summary of all your customers over the last month.
                            View a summary of all your customers over the last month
                        </Text>
                        <Text mt="5" fontSize="14px" fontWeight="400"> Don't you have an account?</Text>
                        <Button colorScheme='gray' variant='solid' mt="5" color="rebeccapurple" fontWeight="bold"
                            w="50%" p="10px" border="none"  borderRadius="0"  
                            onClick={ ()=> navigate('/register')}
                        >Register</Button>
                    </CardBody>
                </Card>

                <Card flex="1" p="20px" 
                    display="flex" justifyContent="center" alignItems="center"
                >
                        <Box p="20px">
                            <Heading size='md' fontSize="30px" color="#555">Login</Heading>
                            <form >
                                <Input mt="6" type="text" variant='flushed' placeholder="Username" /> 
                                <Input mt="6" type="password" variant='flushed' placeholder="Password" /> 
                                <Button type="submit" mt="6"
                                    w="50%" bgColor="#938eef" color="white" fontWeight="bold" borderRadius="0"
                                    _hover={{ bg: '#938ee1' }}
                                > Login </Button>
                            </form>
                            <Text display={["block", "block", "none"]} mt="5" fontSize="14px" fontWeight="400"> Don't you have an account? 
                                <Link to="/register" style={{ fontSize:"15px", color: "blue", marginLeft: "10px"}}>
                                    Register
                                </Link>
                            </Text>
                        </Box>
                </Card>
            </Box>
        </Box>
  )
}

export default Login
