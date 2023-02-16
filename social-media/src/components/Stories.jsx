import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'

let story = [
    {
        id: 1,
        name: 'Jithu',
        img: "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: 'Jithu',
        img: "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name: 'Jithu',
        img: "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name: 'Jithu',
        img: "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
]

const IndividualStory = ({ img, name, user }) => {
    if(user) return (
        <Box flex="1" borderRadius="10px" overflow="hidden" position="relative">
            <Image h="full" w="full" src={ img } objectFit="cover" />
            <Text color="white" position="absolute" bottom="10px" left="10px" fontWeight="400" >{ name } </Text>
            <Button position="absolute" bottom="35px" left="10px" color="white" fontSize="20px"
                bgColor="#5271ff" border="none" borderRadius="50%" size="xs"
                display="flex" justifyContent="center" alignItems="center" w="30px" h="30px"
            >+</Button>
        </Box>
    )
    return (
        <Box flex="1" borderRadius="10px" overflow="hidden" position="relative">
            <Image h="full" w="full" src={ img } objectFit="cover" />
            <Text color="white" position="absolute" bottom="10px" left="10px" fontWeight="400" >{ name } </Text>
        </Box>
    )
}

const Stories = () => {
  return (
    <Box display="flex" gap="10px" height="200px" mb="30px">
        <IndividualStory user={true} img="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" name="Jithu" />
      {
        story.map((story, i) => {
            return <IndividualStory key={i} img={ story.img } name={ story.name } />
        })
      }
    </Box>
  )
}

export default Stories
