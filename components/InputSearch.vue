<template>
  <div class="border rounded px-4 h-10 flex items-center w-full space-x-2">
    <fa-icon :icon="['fas', 'search']" class="text-xl text-neutral-400" />
    <input
      type="text"
      :placeholder="$t('general.search')"
      :value="search"
      class="w-full"
      @input="search = $event.target.value"
    />
  </div>
</template>

<script lang="ts">
export default {
  props: {
    search: {
      type: String,
      default: '',
    },
  },
  emits: ['update:search'],
  watch: {
    search() {
      this.$emit('update:search', this.search)
    },
  },
}
</script>
