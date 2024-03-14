<template>
  <div
    class="flex flex-col items-start space-y-1"
    @click="$router.push(`/products/${product.id}`)"
  >
    <img
      :src="product.image"
      alt="image"
      class="border border-neutral-200 rounded-md"
    />
    <span class="font-bold title">{{ product.name }}</span>
    <span class="text-neutral-700 title">{{ product.price }} €</span>
  </div>
</template>

<script lange="ts">
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
}
</script>
