<template>
  <button
    :class="[
      'rounded px-5 w-fit flex items-center justify-center text-white font-medium',
      buttonClass,
    ]"
    :style="`background-color: ${color}; height: ${
      size === 'lg' ? '3rem' : '2.5rem'
    }`"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { useStore } from '~/store'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'Click me',
    },
    size: {
      type: String,
      default: 'md',
    },
    buttonClass: {
      type: String,
      default: '',
    },
  },
  data() {
    const store = useStore()

    return {
      color: store.company?.color || 'blue',
    }
  },
})
</script>
