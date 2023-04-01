import React from 'react'
import { Box, Heading, Text, Center } from "@chakra-ui/react"

const RichText = ({ heading, text }) => {
  return (
    <Box p="1rem">
      <Center display="flex" flexDir="column" textAlign="center">
        <Heading py="2.5rem">
          {heading && heading}
        </Heading>
        { text ? 
          <Text pb="2rem">
            {text}
          </Text> : null
        }
      </Center>
    </Box>
  )
}

export default RichText