<template>
  <div class="text-black h-screen w-full">
    <div
      v-if="screenWidth < 768"
      class="flex items-center justify-between w-full p-4"
    >
      <div class="space-x-6">
        <fa-icon
          :icon="['fas', 'bars']"
          class="text-2xl"
          @click="showNav = !showNav"
        />
        <span class="font-semibold text-xl">{{ shopName }}</span>
      </div>
      <div class="flex space-x-6">
        <fa-icon :icon="['fas', 'search']" class="text-2xl text-neutral-500" />
        <div class="relative">
          <NuxtLink to="/cart" class="p-2">
            <fa-icon
              :icon="['fas', 'bag-shopping']"
              class="text-2xl text-neutral-500"
            />
          </NuxtLink>
          <span
            class="absolute -bottom-1 -right-1 text-xs rounded-full bg-blue-600 text-white w-[18px] h-[18px] flex items-center justify-center px-1"
          >
            {{ numberOfItems > 9 ? '9+' : numberOfItems }}
          </span>
        </div>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-between border-b border-gray-300 w-full px-6 py-4"
    >
      <div class="w-1/2 flex items-center justify-center space-x-6">
        <NuxtLink to="/" class="text-neutral-500">
          <span>{{ shopName }}</span>
        </NuxtLink>

        <NuxtLink to="/products" class="text-neutral-500">
          <span>
            {{ $t('general.catalog') }}
          </span>
        </NuxtLink>

        <NuxtLink to="/contact" class="text-neutral-500">
          <span>{{ $t('general.contact') }}</span>
        </NuxtLink>
      </div>

      <div class="w-1/2 flex items-center justify-center space-x-6">
        <InputSearch v-model:search="search" class="w-1/3" />

        <fa-icon :icon="['far', 'user']" class="text-2xl text-neutral-500" />
        <fa-icon
          :icon="['fas', 'bag-shopping']"
          class="text-2xl text-neutral-500"
        />
      </div>
    </div>

    <div v-if="!showNav">
      <slot />
    </div>
    <div
      v-else
      class="flex flex-col items-start justify-center space-y-8 p-6 w-full"
    >
      <span class="text-2xl font-semibold pb-6">{{ shopName }}</span>
      <NuxtLink
        to="/"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon :icon="['fas', 'home']" class="text-neutral-500 text-xl" />
        <span class="text-neutral-900 text-xl">
          {{ $t('general.home') }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/products"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon
          :icon="['fas', 'book-open']"
          class="text-neutral-500 text-xl"
        />
        <span class="text-neutral-900 text-xl">
          {{ $t('general.catalog') }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon
          :icon="['fas', 'paper-plane']"
          class="text-neutral-500 text-xl"
        />
        <span class="text-neutral-900 text-xl">
          {{ $t('general.contact') }}
        </span>
      </NuxtLink>
      <NuxtLink
        to="/login"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon
          :icon="['fas', 'arrow-right-to-bracket']"
          class="text-neutral-500 text-xl"
        />
        <span class="text-neutral-900 text-xl">
          {{ $t('login.loginOrRegister') }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from '~/store'
export default {
  setup() {
    const store = useStore()
    const numberOfItems = computed(() =>
      store.cart.products.reduce((acc, p) => acc + p.quantity, 0)
    )
    return {
      numberOfItems,
    }
  },
  data() {
    return {
      showNav: false,
      screenWidth: 0,
      shopName: 'La cagette locale',
      search: '',
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth

    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth
    })
  },
  watch: {
    search() {
      console.log(this.search)
    },
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
