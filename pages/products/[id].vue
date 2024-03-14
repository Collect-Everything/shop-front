<template>
  <div class="flex flex-col space-y-6">
    <ProductCarousel :photos="product.images" />
    <div class="flex flex-col px-4 space-y-4">
      <span class="text-xl">{{ product.name }}</span>
      <span class="text-2xl">{{ product.price }}€</span>
      <div>
        <span class="text-sm">Quantité</span>
        <div class="border flex w-1/3 py-2">
          <span
            class="flex items-center justify-center w-12 cursor-pointer"
            @click="quantity > 1 && (quantity -= 1)"
          >
            <fa-icon :icon="['fas', 'minus']" />
          </span>
          <span class="flex items-center justify-center w-12">
            {{ quantity }}
          </span>
          <span
            class="flex items-center justify-center w-12 cursor-pointer"
            @click="quantity += 1"
          >
            <fa-icon :icon="['fas', 'plus']" />
          </span>
        </div>
      </div>
      <button
        class="btn-secondary w-fit"
        @click="
          addToCart({
            id,
            quantity,
          })
        "
      >
        Ajouter au panier
      </button>
      <div class="flex items-center space-x-2">
        <span class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-teal-500"
          ></span>
        </span>
        <span class="text-sm">{{ stock }} en stock</span>
      </div>
      <div class="flex flex-col">
        <span class="text-lg">Détails du produit</span>
        <span>{{ product.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '~/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const { addToCart, getProductById } = store
    // const { getProductById } = storeToRefs(store)

    // onMounted(() => {
    //   getProductById(router.params.id)
    // })
  },
  data() {
    return {
      id: this.$route.params.id,
      quantity: 1,
      stock: 10,
      product: {},
    }
  },
  mounted() {
    getProductById(this.id)
  },
}
</script>
