<template>
  <div
    class="h-[80vh] w-full flex flex-col items-center justify-center relative"
  >
    <img
      v-if="!!image"
      :src="image"
      alt="bg-image"
      class="inset-0 absolute z-0 w-full h-full object-cover"
      crossorigin="anonymous"
    />
    <div
      v-if="!image"
      class="absolute inset-0 z-0 opacity-40"
      :style="`background-color: ${color}`"
    />
    <div class="absolute z-10 inset-0 bg-neutral-900/80" />
    <div
      class="flex flex-col gap-8 items-center z-20 text-white text-center container mx-auto px-4"
    >
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-lg">
        {{ title }}
      </h1>
      <p class="text-lg md:text-xl max-w-2xl">{{ description }}</p>
      <Button
        :text="button ?? ''"
        :size="'lg'"
        @click="$router.push(`/${storeSlug}/products`)"
      />
    </div>
  </div>
  <div
    class="container px-4 py-12 sm:py-16 lg:py-20 space-y-6 sm:space-y-8 lg:space-y-10 mx-auto flex flex-col items-center"
  >
    <h2 class="title-2">Catalogue</h2>
    <div class="flex flex-wrap gap-4 w-full">
      <ProductCard
        v-for="product in products.slice(0, 6)"
        :key="product.id"
        :product="product"
      />
    </div>
    <Button
      :text="'Voir tous les produits'"
      :size="'lg'"
      @click="$router.push(`/${storeSlug}/products`)"
    />
  </div>
  <div class="container px-4 py-12 mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Advantage
        v-for="advantage in advantages"
        :key="advantage.title"
        :title="advantage.title"
        :description="advantage.description"
        :icon="advantage.icon"
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
