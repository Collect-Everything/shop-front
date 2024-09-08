import { defineStore } from 'pinia'

export interface Product {
  id: string
  companyId: string
  category: { id: string; name: string }
  name: string
  price: number
  description?: string
  image?: string
  stock: number
  conditioning: string
  unity: string
  size?: string
}
export interface CompanyState {
  id: string
  storeName: string
  storeSlug: string
  color?: string | null
  logo?: string | null
  title?: string | null
  description?: string | null
  button?: string | null
  image?: string | null
  advantages?: { title: string; description: string; icon?: string }[] | null
  productsType?: string | null
  phoneContact?: string | null
  emailContact?: string | null
  instagramUrl?: string | null
  twitterUrl?: string | null
  facebookUrl?: string | null
  externalUrl?: string | null
  products: Product[]
}

export interface Cart {
  products: Array<{ productId: string; quantity: number; price: number }>
}

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    user: null,
    company: null as CompanyState | null,
    cart: {
      products: [],
    } as Cart,
  }),
  getters: {
    cartProducts: (state) => {
      return state.cart.products
        .map((product) => {
          const productData = state.company?.products.find(
            (p) => p.id === product.productId
          )

          if (!productData) return
          return {
            ...productData,
            ...product,
          }
        })
        .filter(Boolean) as (Product & { quantity: number })[]
    },
    subtotal: (state) => {
      return state.cart.products.reduce((acc, product) => {
        const productData = state.company?.products.find(
          (p) => p.id === product.productId
        )
        if (!productData) return acc
        return acc + productData.price * product.quantity
      }, 0)
    },
  },
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    async fetchCompanyData(companySlug: string) {
      const nuxtApp = useNuxtApp()
      const config = nuxtApp.$config
      const apiUrl = config.public.API_GATEWAY_URL
      const response = await fetch(`${apiUrl}/companies/${companySlug}/data`, {
        method: 'GET',
      })

      if (!response.ok) {
        return
      }

      const data = await response.json()

      console.log('data', data)
      this.company = data.data
    },
    fetchCart() {
      const cart = localStorage.getItem('cart')
      if (cart) this.cart = JSON.parse(cart)
    },
    addToCart(productId: string, quantity = 1) {
      const product = this.company?.products.find((p) => p.id === productId)
      if (!product) return
      const newCart = { ...this.cart }
      const productInCart = this.cart.products.find(
        (p) => p.productId === product.id
      )

      if (productInCart) {
        newCart.products = this.cart.products.map((p) =>
          p.productId === product.id
            ? {
              ...p,
              quantity: p.quantity + quantity,
            }
            : p
        )
      } else {
        newCart.products.push({
          productId: product.id,
          quantity,
          price: product.price,
        })
      }

      this.cart = newCart

      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    updateQuantity(id: string, quantity: number) {
      const product = this.cart.products.find((p) => p.productId === id)

      if (product) {
        const newCart = { ...this.cart }
        if (quantity <= 0) {
          this.removeProduct(id)
          return;
        } else {
          newCart.products = this.cart.products.map((p) =>
            p.productId === id ? { ...p, quantity } : p
          )

          this.cart = newCart
        }

        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeProduct(id: string) {
      const product = this.cart.products.find((p) => p.productId === id)

      if (product) {
        this.cart = {
          ...this.cart,
          products: this.cart.products.filter((p) => p.productId !== id),
        }

        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    getProducts(number?: number) {
      return number
        ? this.company?.products.slice(0, number) ?? []
        : this.company?.products ?? []
    },
    getProductById(id: string) {
      return this.company?.products.find((product) => product.id === id)
    },
  },
})
