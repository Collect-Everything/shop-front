import { defineStore } from 'pinia'
import type { Product, CartProduct, Cart } from '~/types/custom-types'

export interface CompanyState {
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
  products: {
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
  }[]
}

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    user: null,
    company: null as CompanyState | null,
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
    addToCart(product: CartProduct) {
      const productInCart = this.cart.products.find((p) => p.id === product.id)

      if (productInCart) productInCart.quantity += product.quantity
      else this.cart.products.push(product)

      this.cart.total += product.price * product.quantity

      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    updateQuantity(id: number, quantity: Event) {
      const qty = Number((quantity.target as HTMLInputElement).value)

      const product = this.cart.products.find((p) => p.id === id)

      if (product) {
        product.quantity = qty
        this.cart.total += product.price * product.quantity

        localStorage.setItem('cart', JSON.stringify(this.cart))
      }
    },
    removeProduct(id: number) {
      const product = this.cart.products.find((p) => p.id === id)

      if (product) {
        this.cart.total -= product.price * product.quantity
        this.cart.products = this.cart.products.filter((p) => p.id !== id)

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
