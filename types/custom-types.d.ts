// Définition du type Product
export interface Product {
  id: number
  name: string
  price: number
  description: string
  images: Array<string>
  stock: number
}

export interface CartProduct {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface Cart {
  products: Array<CartProduct>
  total: number
}
