<template>
  <div class="container max-w-[980px] mx-auto py-8 sm:py-12 px-4">
    <div class="flex gap-8">
      <div
        class="w-full h-[400px] sm:h-[600px] border rounded bg-neutral-50 group-hover:scale-[102%] transition-all"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt="image"
          class="border border-neutral-200 rounded-md"
        />
      </div>
      <div class="w-1/3">
        <div class="flex flex-col gap-4">
          <h1 class="title-3">{{ product.name }}</h1>
          <p class="text-large">{{ product.price.toFixed(2) }} €</p>
          <div class="space-y-1">
            <p class="text-small text-light">Quantité</p>
            <div
              class="flex gap-2 px-3 h-10 border border-neutral-700 items-center w-fit"
            >
              <button @click="decreaseQuantity" class="p-2 text-neutral-500">
                <font-awesome-icon icon="minus" />
              </button>
              <span class="text-large">{{ quantity }}</span>
              <button @click="increaseQuantity" class="p-2 text-neutral-500">
                <font-awesome-icon icon="plus" />
              </button>
            </div>
          </div>
          <Button
            :text="'Ajouter au panier'"
            :size="'lg'"
            :class="'w-full'"
            @click="addToCart"
          />
          <div class="flex items-center gap-1 text-sm text-neutral-400">
            <div class="bg-green-300 w-3 h-3 rounded-full" />
            {{ product.stock }} en stock
          </div>
          <div>
            <h2 class="text-base">Détails du produit</h2>
            <p class="text-neutral-500">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '~/store'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default defineComponent({
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const id = String(router.currentRoute.value.params.id)
    const product = store.getProductById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    const quantity = ref(1)

    const increaseQuantity = () => {
      quantity.value++
    }

    const decreaseQuantity = () => {
      if (quantity.value > 1) {
        quantity.value--
      }
    }

    const addToCart = () => {
      store.addToCart(id, quantity.value)
      useNuxtApp().$toast.success('Produit ajouté au panier')
    }

    return {
      ...store.company,
      addToCart,
      product,
      quantity,
      increaseQuantity,
      decreaseQuantity,
    }
  },
})
</script>
