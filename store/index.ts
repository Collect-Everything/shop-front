import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    user: null,
    products: [],
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
  },
  getters: {
    getProducts(): Array<any> {
      // or Array<Product> => define product type
      return this.products
    },
  },
})
