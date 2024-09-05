<template>
  <div class="flex flex-col space-y-4 py-8 sm:py-12">
    <div class="flex flex-col gap-12 container mx-auto px-4">
      <h1 class="text-2xl title-3">Mon panier</h1>
      <template v-if="store.cartProducts.length === 0">
        <span class="text-neutral-600 text-center">
          Votre panier est vide. Ajoutez des produits pour continuer.
        </span>
      </template>
      <template v-else>
        <div class="space-y-4">
          <div
            v-for="(product, index) in store.cartProducts"
            :key="product.id"
            class="flex gap-8"
          >
            <div class="w-36 h-36 rounded bg-neutral-100 border">
              <img
                v-if="product.image"
                :src="product.image"
                :alt="index.toString()"
                class="w-1/2 rounded-md"
                crossorigin="anonymous"
              />
            </div>
            <div class="flex-1 flex flex-col gap-6">
              <div class="flex items-center justify-between">
                <span class="text-xl">
                  {{ product.name }}
                </span>
                <div @click="store.removeProduct(product.id)">
                  <fa-icon
                    :icon="['fas', 'trash-alt']"
                    class="text-lg text-neutral-400"
                  />
                </div>
              </div>
              <select
                class="w-fit input"
                :value="product.quantity"
                @input="
                  store.updateQuantity(
                    product.id,
                    Number(($event.target as HTMLInputElement).value)
                  )
                "
              >
                <option
                  v-for="option in 100"
                  :key="`option-${option}`"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
              <p class="">{{ product.price.toFixed(2) }} €</p>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="bg-neutral-100 flex flex-col p-6">
      <div class="container mx-auto px-4 space-y-4">
        <span class="text-xl">Mon panier</span>
        <div class="flex flex-col space-y-2">
          <div class="flex items-center justify-between">
            <span>Sous-total</span>
            <span>{{ store.subtotal.toFixed(2) }} €</span>
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
        <Button :text="'Commander'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '~/store'

export default {
  setup() {
    const store = useStore()


    return {
      store
    }
  },
  computed: {
    fees() {
      return this.store.subtotal * 0.2
    },
    total() {
      return this.store.subtotal + this.fees
    },
  },
}
</script>
