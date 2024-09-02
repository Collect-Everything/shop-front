<template>
  <NuxtLink :to="`/${storeSlug}/products/${product.id}`">
    <div
      class="flex flex-col items-start gap-2 w-full min-w-64 max-w-72 group cursor-pointer"
    >
      <div
        class="w-full h-80 border rounded bg-neutral-50 group-hover:scale-[102%] transition-all"
      >
        <img
          v-if="product.image"
          :src="product.image"
          alt="image"
          class="border border-neutral-200 rounded-md"
          crossorigin="anonymous"
        />
      </div>
      <p class="font-medium text-xl">{{ product.name }}</p>
      <div>
        <p class="text-lg">{{ product.price.toFixed(2) }} €</p>
        <p class="text-neutral-400">
          {{ PRODUCT_CONDITIONING_LABELS[product.conditioning] }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>

<script lange="ts">
import { PRODUCT_CONDITIONING_LABELS } from '~/types/products'
import { useStore } from '~/store'
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    const store = useStore()
    return {
      PRODUCT_CONDITIONING_LABELS,
      storeSlug: store.company?.storeSlug || '',
    }
  },
}
</script>
