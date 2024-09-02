<template>
  <div class="container mx-auto px-4 py-8 sm:py-12">
    <h1 class="font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl">
      Catalogue
    </h1>
    <div class="flex items-center justify-between">
      <p></p>
      <p>{{ products.length }} produit{{ products.length > 1 ? 's' : '' }}</p>
    </div>
    <div class="flex flex-wrap gap-4 w-full">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '~/store'

export default {
  data() {
    const store = useStore()

    return store.company
  },
}
</script>
