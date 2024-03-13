<template>
  <div class="input flex items-center w-full space-x-2">
    <fa-icon :icon="['fas', 'search']" class="text-2xl text-neutral-500" />
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
