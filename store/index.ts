import { defineStore } from 'pinia'
import type { Product, CartProduct, Cart } from '~/types/custom-types'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    user: null,
    products: [
      {
        id: 1,
        name: 'Pommes de terre',
        price: 2.5,
        description: 'Pommes de terre de qualité supérieure',
        images: ['https://source.unsplash.com/1600x900/?potato'],
        stock: 10,
      },
      {
        id: 2,
        name: 'Tomates',
        description: 'Pommes de terre de qualité supérieure',
        price: 3.5,
        images: ['https://source.unsplash.com/1600x900/?tomato'],
        stock: 10,
      },
      {
        id: 3,
        name: 'Carottes',
        description: 'Pommes de terre de qualité supérieure',
        price: 1.5,
        images: ['https://source.unsplash.com/1600x900/?carrot'],
        stock: 10,
      },
      {
        id: 4,
        name: 'Oignons',
        description: 'Pommes de terre de qualité supérieure',
        price: 2,
        images: ['https://source.unsplash.com/1600x900/?onion'],
        stock: 10,
      },
      {
        id: 5,
        name: 'Salade',
        description: 'Pommes de terre de qualité supérieure',
        price: 2.5,
        images: ['https://source.unsplash.com/1600x900/?lettuce'],
        stock: 10,
      },
      {
        id: 6,
        name: 'Pommes',
        description: 'Pommes de terre de qualité supérieure',
        price: 3,
        images: ['https://source.unsplash.com/1600x900/?apple'],
        stock: 10,
      },
    ] as Array<Product>,
    cart: {
      products: [] as Array<CartProduct>,
      total: 0,
    } as Cart,
  }),
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    async fetchProducts() {
      const products = await fetch('/api/products').then((res) => res.json())
      this.products = products
    },
    addToCart(product: CartProduct) {
      const productInCart = this.cart.products.find((p) => p.id === product.id)

      if (productInCart) productInCart.quantity += product.quantity
      else this.cart.products.push(product)

      this.cart.total += product.price * product.quantity
      console.log(this.cart)
    },
    getProducts() {
      return this.products
    },
    getCart() {
      return this.cart
    },
    getProductById(id: number) {
      return this.products.find((product) => product.id === id)
    },
  },
})
