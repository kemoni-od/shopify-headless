import React, { useContext, useEffect } from 'react'
import {withRouter} from 'react-router';

import { useParams } from 'react-router-dom'
import { Box, Flex, Grid, Text, Image, Icon, Heading, Center, Button } from '@chakra-ui/react'

import { ShopContext } from '../context/shopContext'

const ProductPage = () => {

    const { handle } = useParams();

    console.log(handle)

    const { fetchProductWithHandle, product, addItemToCheckout } = useContext(ShopContext)


    useEffect(() => {
        fetchProductWithHandle(handle)
    }, [fetchProductWithHandle, handle])

    if (!product.title) return <div>Loading...</div>

    return (
        <Box p="2rem">
            <Grid templateColumns={["repeat(1,1fr)", "repeat(2,1fr)"]} m="auto">
                <Flex justifyContent="center" alignItems="center">
                    <Image src={product.images[0].src} />
                </Flex>
                <Flex flexDirection="column" alignItems="center" justifyContent="center" px="2rem">
                    <Heading pb="2rem">{product.title}</Heading>
                    <Text fontWeight="bold" pb="2rem">{product.variants[0].price.amount}</Text>
                    <Text pb="2rem" color="gray.500">{product.description}</Text>
                    <Button
                        onClick={() => addItemToCheckout(product.variants[0].id, 1)}
                        _hover={{ opacity: '70%' }}
                        w="10rem" backgroundColor="#FF38BD" color="white"
                    >
                        Add To Cart
                    </Button>
                </Flex>
            </Grid>
        </Box>
    )
}

const queryString = `{
    products (first: 3) {
      edges {
        node {
          id
          title
        }
      }
    }
  }`
  
  // // `session` is built as part of the OAuth process
  // const client = new shopify.clients.Graphql({session});
  // const products = await client.query({
  //   data: queryString,
  // });

  // console.log(products)
  


export default  withRouter(ProductPage)