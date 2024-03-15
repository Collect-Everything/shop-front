<template>
  <div class="flex flex-col space-y-4">
    <div class="flex flex-col p-4 space-y-2">
      <span class="text-2xl title">Mon panier</span>
      <template v-if="cart.products.length === 0">
        <span class="text-neutral-600 text-center">
          Votre panier est vide. Ajoutez des produits pour continuer.
        </span>
      </template>
      <template v-else>
        <div
          v-for="(product, index) in cart.products"
          :key="product.id"
          class="flex space-x-4 items-center"
        >
          <img
            :src="product.image"
            :alt="index.toString()"
            class="w-1/2 rounded-md"
          />
          <div class="w-1/2">
            <div class="flex flex-col space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xl">
                  {{ product.name }}
                </span>
                <div @click="removeProduct(product.id)">
                  <fa-icon
                    :icon="['fas', 'trash-alt']"
                    class="text-lg text-neutral-400"
                  />
                </div>
              </div>
              <select
                class="w-fit input"
                :value="product.quantity"
                @input="updateQuantity(product.id, $event)"
              >
                <option
                  v-for="option in 10"
                  :key="`option-${option}`"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <span class=""> {{ product.price.toFixed(2) }} € </span>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="bg-neutral-100 flex flex-col p-4 space-y-4">
      <span class="text-xl">Mon panier</span>
      <div class="flex flex-col space-y-2">
        <div class="flex items-center justify-between">
          <span>Sous-total</span>
          <span>{{ subTotal.toFixed(2) }} €</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Frais de transaction</span>
          <span>{{ fees.toFixed(2) }} €</span>
        </div>
      </div>
      <hr class="bg-neutral-400" />
      <div class="flex items-center justify-between title">
        <span>Total (TVA incluse)</span>
        <span>{{ total.toFixed(2) }} €</span>
      </div>
      <button class="btn-secondary">Commander</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '~/store'

export default {
  setup() {
    const store = useStore()
    const { cart, updateQuantity, removeProduct } = store

    return {
      cart,
      updateQuantity,
      removeProduct,
    }
  },
  computed: {
    subTotal() {
      return this.cart.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )
    },
    fees() {
      return this.subTotal * 0.2
    },
    total() {
      return this.subTotal + this.fees
    },
  },
}
</script>
