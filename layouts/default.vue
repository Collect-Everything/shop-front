<template>
  <div class="text-black h-screen w-full">
    <div
      v-if="screenWidth < 768"
      class="flex items-center justify-between border-b border-gray-300 w-full px-4"
    >
      <div class="w-1/3 flex items-center">
        <fa-icon
          :icon="['fas', 'bars']"
          class="text-2xl"
          @click="showNav = !showNav"
        />
      </div>
    </div>
    <div v-else>
      <div
        class="flex items-center justify-between border-b border-gray-300 w-full px-6"
      >
        <div class="w-1/2 flex items-center space-x-6">
          <NuxtLink to="/" class="text-neutral-500">
            <span>{{ $t('general.home') }}</span>
          </NuxtLink>

          <NuxtLink to="/prices" class="text-neutral-500">
            <span>{{ $t('prices.title') }}</span>
          </NuxtLink>

          <NuxtLink to="/about" class="text-neutral-500">
            <span>{{ $t('general.about') }}</span>
          </NuxtLink>
        </div>

        <div class="w-1/2 flex items-center justify-end space-x-6">
          <button class="btn-secondary" @click="$router.push('/register')">
            <span>{{ $t('login.register') }}</span>
          </button>

          <button
            class="btn-skeleton-secondary"
            @click="$router.push('/login')"
          >
            <span>{{ $t('login.login') }}</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="!showNav" class="py-6">
      <slot />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center space-y-6 pt-6 divide-y divide-gray-300 w-full"
    >
      <NuxtLink
        to="/"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon :icon="['fas', 'home']" />
        <span>{{ $t('general.home') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showNav: false,
      screenWidth: 0,
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },
}
</script>

<style>
.router-link-active {
  @apply font-semibold text-neutral-900 !important;
}
.router-link-active:hover {
  @apply text-neutral-600 !important;
}
</style>
