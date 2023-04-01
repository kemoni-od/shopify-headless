import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Flex, Grid, Text, Image, Icon, Box, Badge } from '@chakra-ui/react'
import { ShopContext } from '../context/shopContext'
import { MdMenu, MdShoppingBasket } from 'react-icons/md'

const NavBar = () => {

    const { openCart, openMenu, checkout } = useContext(ShopContext);
    return (
        <Flex backgroundColor="#FFA8E2" flexDirection="row" alignItems="center" justifyContent="space-between" p="2rem">
            <Icon cursor="pointer" fill="white" as={MdMenu} w={30} h={30}
                onClick={() => openMenu()}
            />
            <Link to="/" href='/'><Image src="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/Logologo_1.svg?v=1610055540" w={100} h={100} /></Link>
            <Box>
                <Icon cursor="pointer" fill="white" as={MdShoppingBasket} w={30} h={30}
                    onClick={() => openCart()}
                />
                <Badge backgroundColor="#FF3880" borderRadius="50%" >
                    {checkout.lineItems?.length}
                </Badge>
            </Box>
        </Flex>
    )
}

export default NavBar