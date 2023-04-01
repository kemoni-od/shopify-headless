import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Grid,
    Text,
    Flex,
    Image,
    Divider,
    Box
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import Home from '../pages/Home'

const Cart = () => {

    const { isCartOpen, closeCart, checkout, removeLineItem } = useContext(ShopContext);

    var checkoutUrl = checkout.webUrl;

    if (checkoutUrl) {
    var url = new URL(checkoutUrl)
    }

    const item = {
        projurl: checkoutUrl
      }

      console.log(item.projurl);

      function urlReplace(e) {
        var checkoutBtn = document.querySelector('footer button')
        console.log(checkoutBtn)
        console.log(e)

        if (checkoutBtn) {
        }
      }

      urlReplace();


    return (
        <>
            <Drawer
                isOpen={isCartOpen}
                placement='right'
                onClose={closeCart}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Your Shopping Cart</DrawerHeader>

                    <DrawerBody>
                        {
                            checkout.lineItems?.length ? checkout.lineItems.map(item => (
                                <Grid templateColumns="repeat(4, 1fr)" gap={1} key={item.id}>
                                    <Flex alignItems="center" justifyContent="center">
                                        <CloseIcon cursor="pointer" onClick={() => removeLineItem(item.id)} />
                                    </Flex>
                                    <Flex alignItems="center" justifyContent="center">
                                        <Image src={item.variant.image.src} />
                                    </Flex>
                                    <Flex alignItems="center" justifyContent="center">
                                        <Text>{item.title}</Text>
                                    </Flex>
                                    <Flex alignItems="center" justifyContent="center">
                                        <Text>{item.variant.price.amount}</Text>
                                    </Flex>
                                </Grid>
                            )) : 
                            <Box h="100%" w="100%">
                                <Text h="100%" display="flex" flexDir="column" alignItems="center" justifyContent="center">
                                    Your cart is empty!
                                </Text>
                            </Box>
                        }
                    </DrawerBody>

                    {checkout.lineItems?.length ?
                        <DrawerFooter>
                            <Button w='100%'>
                                <Link to='yo.com' target="_blank" rel="noopener noreferrer" w='100%'>
                                    Checkout Here
                                </Link>
                            </Button>
                        </DrawerFooter> : null
                    }
                </DrawerContent>
            </Drawer>
        </>

    )
}

<script>

</script>

export default Cart