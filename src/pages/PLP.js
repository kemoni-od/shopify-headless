import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router';
import { useParams, Link } from 'react-router-dom'
import { Box, Flex, Grid, Text, Image, Heading, Button } from '@chakra-ui/react'

import { ShopContext } from '../context/shopContext'

const PLP = (props) => {
    console.log(props.location.pathname.split('/collections/')[1])

    props.match.params.id = props.location.pathname.split('/collections/')[1];

    const {id} = useParams()

    const { fetchCollectionWithHandle, collection, fetchAllCollections, collections, fetchAllProducts, products, openMenu, closeMenu } = useContext(ShopContext)

    useEffect(() => {
        fetchCollectionWithHandle(id)
    }, [fetchCollectionWithHandle, id])

    if (!collection.image) return <div>loading...</div>

    return (
        <Box >
            <Image w='100vw' h='70vh'
                src={collection.image.src} />

            <Heading pb='1rem' p="2rem" color='white' bottom='8rem' pos='relative'>
                {collection.title}
            </Heading>

            <Grid templateColumns="repeat(3, 1fr)" gap='1.5rem' p='2rem' pt='0'>
                {
                    collection.products.map(product => (

                        <Link to={`/products/${product.handle}`} href={`/products/${product.handle}`} key={product.id}>
                            <Box _hover={{ opacity: '80%' }} textAlign="center" position="relative">
                                <Image src={product.images[0].src} />
                                {product.availableForSale ? false : <Box borderRadius="100%"
                                    width="30%"
                                    border="3px solid white;"
                                    backgroundColor="white"
                                    position= "absolute"
                                    top= "2%"
                                    left= "2%"
                                >
                                    <Text w="50%" m="auto">
                                        'OUT OF STOCK'
                                    </Text>
                                </Box>}
                                
                                <Text pt='.5rem' w="100%" fontWeight="bold" textAlign='left'>
                                    {product.title}
                                </Text>
                                <Text textAlign='left' w="100%" color="gray.500">
                                    ${product.variants[0].price.amount}
                                </Text>
                            </Box>
                        </Link>
                    ))
                }
            </Grid>
        </Box>
    )
}

export const getAlProductsInCategoryQuery = `{
    products(first: 250) {
        edges {
            node {
                metafields(first: 250) {
                    edges {
                        node {
                            namespace
                            key
                            value
                        }
                    }
                }
            }
        }
    }
}`

fetch('/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({ query: `${getAlProductsInCategoryQuery}` })
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));

console.log(getAlProductsInCategoryQuery);

export default withRouter(PLP)