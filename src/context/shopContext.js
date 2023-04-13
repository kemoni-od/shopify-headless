import React, { Component } from 'react'
import Client from 'shopify-buy/index.unoptimized.umd';

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

        // Build a custom products query using the unoptimized version of the SDK
        const productsQuery = await client.graphQLClient.query((root) => {
            root.addConnection('products', { args: { first: 10 } }, (product) => {
                product.add('title');
                product.add('handle');
                product.add('id');
                // product.add('tags');
                product.add('options');
                console.log(product)


            });
        });

        console.log(productsQuery)
        


        // Call the send method with the custom products query
        client.graphQLClient.send(productsQuery).then(({ model, data }) => {
            // Do something with the products

            console.log(data.products);

            console.log(productsQuery)
        });

        const products = await client.product.fetchAll();
        this.setState({ products: products })

        // console.log(products)
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

    closeMenu = () => { this.setState({ isMenuOpen: false }) }

    openMenu = () => { this.setState({ isMenuOpen: true }) }


    render() {
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