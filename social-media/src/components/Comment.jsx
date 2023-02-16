import React from 'react'
import { Box, Text, Input, Image, useColorMode, Button } from '@chakra-ui/react'

const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "John Doe",
      userId: 1,
      img:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
      name: "Jane Doe",
      userId: 2,
      img:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
];

const IndividualComment = ({ comment }) => {
    const { img, name, desc } = comment;
    return(
        <Box m="30px 0" display="flex" justifyContent="space-between" gap="20px">
            <Image src={ img} w="40px" h="40px" borderRadius="50%" objectFit="cover" />
            <Box display="flex" flexDir="column" gap="3px" flex="5" alignItems="flex-start">
                <Text  fontWeight="500"> { name } </Text>
                <Text > { desc } </Text>
            </Box>
            <Text flex="1" alignSelf="center" color="grey" fontSize="14px"> 1 hour ago </Text>
        </Box>
    )
}

  const Comment = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const border = (colorMode === 'light') ? "1px solid lightgray" : "1px solid #444";
  return (
    <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" gap="20px" m="20px 0">
            <Image src="https://images.pexels.com/photos/5157169/pexels-photo-5157169.jpeg?auto=compress&cs=tinysrgb&w=600" 
                w="40px" h="40px" borderRadius="50%" objectFit="cover" 
            />
            <Input flex="5" type="text" placeholder="write a comment..." border={border} />
            <Button border="none" bgColor="#5271ff" color="white" p="10px 20px">Send</Button>
        </Box>
       {
        comments.map((comment, i) => {
            return <IndividualComment key={i} comment={comment} />
        })
       }
    </Box>
  )
}

export default Comment
