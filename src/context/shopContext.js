import React, { Component } from 'react'
import Client from 'shopify-buy'

const ShopContext = React.createContext();

const client = Client.buildClient({
    domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API
});

// console.log(client.collection.fetchWithProducts())

class ShopProvider extends Component {
    state = {
        product: {},
        products: [],
        collections: [],
        collection: {},
        checkout: {},
        isCartOpen: false,
        isMenuOpen: false
    }


    componentDidMount() {
        if (localStorage.checkout_id) {
            this.fetchCheckout(this.localStorage.checkout_id)
        } else {
            this.createCheckout()
        }
    }

    createCheckout = async () => {
        const checkout = await client.checkout.create();
        localStorage.setItem('checkout-id', checkout.id)
        this.setState({ checkout: checkout })
    }

    fetchCheckout = async (checkoutId) => {
        client.checkout
            .fetch(checkoutId)
            .then((checkout) => {
                this.setState({ checkout: checkout })
            })
    }

    addItemToCheckout = async (variantId, quantity) => {
        const lineItemsToAdd = [
            {
                variantId,
                quantity: parseInt(quantity, 10)
            }
        ]

        const checkout = await client.checkout.addLineItems(this.state.checkout.id, lineItemsToAdd)
        this.setState({ checkout: checkout })

        this.openCart();
    }

    removeLineItem = async (lineItemIdsToRemove) => {
        const checkout = client.checkout.removeLineItems(this.state.checkout.id, lineItemIdsToRemove)
        this.setState({ checkout: checkout })
    }

    fetchAllProducts = async () => {
        const products = await client.product.fetchAll();
        this.setState({ products: products })
    }

    fetchAllCollections = async () => {
        const collections = await client.collection.fetchAll();
        this.setState({ collections: collections })
        console.log(collections)
    }

    fetchCollectionWithHandle = async (collectionId) => {
        
        const collection = await client.collection.fetchWithProducts(collectionId);
        this.setState({ collection: collection })
        console.log(collection)

    }

    fetchProductWithHandle = async (handle) => {
        const product = await client.product.fetchByHandle(handle)
        this.setState({ product: product })
    }

    closeCart = () => { this.setState({ isCartOpen: false }) }

    openCart = () => { this.setState({ isCartOpen: true }) }

    closeMenu = () => { this.setState({ isMenuOpen: false })}

    openMenu = () => { this.setState({ isMenuOpen: true })}


    render() {
        console.log(this.state.collection)
        return (
            <ShopContext.Provider
                value={{
                    ...this.state,
                    fetchAllCollections: this.fetchAllCollections,
                    fetchCollectionWithHandle: this.fetchCollectionWithHandle,
                    fetchAllProducts: this.fetchAllProducts,
                    fetchProductWithHandle: this.fetchProductWithHandle,
                    closeCart: this.closeCart,
                    openCart: this.openCart,
                    closeMenu: this.closeMenu,
                    openMenu: this.openMenu,
                    addItemToCheckout: this.addItemToCheckout,
                    removeLineItem: this.removeLineItem
                }}
            >
                {this.props.children}
            </ShopContext.Provider>
        )
    }
}

const ShopConsumer = ShopContext.Consumer

export { ShopConsumer, ShopContext }

export default ShopProvider