<template>
  <div
    class="space-y-4 px-6 py-8 rounded bg-neutral-100 flex flex-col items-center flex-1 min-h-52"
  >
    <fa-icon v-if="icon" :icon="['fas', icon]" />
    <h2 class="font-bold">{{ title }}</h2>
    <p class="text-neutral-600">{{ description }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
    description: {
      type: String,
      default: 'Description',
    },
    icon: {
      type: String,
      default: '',
    },
  },
}
</script>
