import { defineStore } from 'pinia'

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
        image: 'https://source.unsplash.com/1600x900/?potato',
      },
      {
        id: 2,
        name: 'Tomates',
        description: 'Pommes de terre de qualité supérieure',
        price: 3.5,
        image: 'https://source.unsplash.com/1600x900/?tomato',
      },
      {
        id: 3,
        name: 'Carottes',
        description: 'Pommes de terre de qualité supérieure',
        price: 1.5,
        image: 'https://source.unsplash.com/1600x900/?carrot',
      },
      {
        id: 4,
        name: 'Oignons',
        description: 'Pommes de terre de qualité supérieure',
        price: 2,
        image: 'https://source.unsplash.com/1600x900/?onion',
      },
      {
        id: 5,
        name: 'Salade',
        description: 'Pommes de terre de qualité supérieure',
        price: 2.5,
        image: 'https://source.unsplash.com/1600x900/?lettuce',
      },
      {
        id: 6,
        name: 'Pommes',
        description: 'Pommes de terre de qualité supérieure',
        price: 3,
        image: 'https://source.unsplash.com/1600x900/?apple',
      },
    ],
    cart: {
      products: [],
      total: 0,
    }
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
    addToCart(product: any) {
      if (this.cart.products.find((p) => p.id === product.id))
        this.cart.products.find((p) => p.id === product.id).quantity += product.quantity
      else
        this.cart.products.push(product)

      this.cart.total += product.price * product.quantity
      console.log(this.cart);

    },
    getProductById(id: number) {
      return this.products.find((product) => product.id === id)
    }
  },
  getters: {
    getProducts(): Array<any> {
      // or Array<Product> => define product type
      return this.products
    },
    // getProductById: (state) => (id: number) => {
    //   return state.products.find((product) => product.id === id)
    // }
  },
})
