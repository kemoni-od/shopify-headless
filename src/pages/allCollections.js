import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router';
import { useParams, Link } from 'react-router-dom'
import { Box, Flex, Grid, Text, Image, Heading, Button } from '@chakra-ui/react'

import { ShopContext } from '../context/shopContext'

const AllCollections = () => {

    const { fetchAllCollections, collections, openMenu, closeMenu } = useContext(ShopContext)

    useEffect(() => {
        fetchAllCollections()
    }, [fetchAllCollections])

    if (!collections) return <div>loading...</div>

    console.log(collections)


    return (
        <Box p="2rem">
            <Heading pb='1rem'>
                All Collections
            </Heading>

            <Grid templateColumns="repeat(3, 1fr)" gap='1.5rem' pt='2rem'>
                {
                    collections.map(collection => (

                        console.log(collection),
                        <Link to={`/collections/${collection.id}`} href={`/collections/${collection.id}`} key={collection.id}>
                            <Box _hover={{ opacity: '80%' }} textAlign="center" position="relative">
                                <Image src={collection.image.src} />

                                <Text pt='.5rem' w="100%" fontWeight="bold" textAlign='left'>
                                    {collection.title}
                                </Text>

                            </Box>
                        </Link>
                    ))
                }
            </Grid>
        </Box>
    )
}

export const getAlcollectionsInCategoryQuery = `{
    collections(first: 250) {
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
    body: JSON.stringify({ query: `${getAlcollectionsInCategoryQuery}` })
})
    .then(r => r.json())
    .then(data => console.log('data returned:', data));

console.log(getAlcollectionsInCategoryQuery);

export default withRouter(AllCollections)