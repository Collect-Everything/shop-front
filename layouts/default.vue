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
        <div>
          <NuxtImg
            v-if="logo"
            :src="logo"
            alt="logo"
            class="h-10 w-10"
            crossorigin="anonymous"
          />
          <span class="font-semibold text-xl">{{ shopName }}</span>
        </div>
      </div>
      <div class="flex space-x-6">
        <fa-icon :icon="['fas', 'search']" class="text-2xl text-neutral-500" />
        <div class="relative">
          <NuxtLink :to="`/${storeSlug}/cart`" class="p-2">
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
      class="flex items-center justify-between border-b border-gray-300 w-full px-6 py-4 container mx-auto px-4"
    >
      <div class="flex items-center justify-center space-x-6">
        <NuxtLink
          :to="`/${storeSlug}`"
          class="text-neutral-500 flex items-center gap-1 mr-8"
        >
          <NuxtImg
            v-if="logo"
            :src="logo"
            alt="logo"
            class="h-10 w-10 object-contain"
            crossorigin="anonymous"
          />
          <span>{{ shopName }}</span>
        </NuxtLink>
        <NuxtLink :to="`/${storeSlug}/products`" class="text-neutral-500">
          <span>
            {{ $t('general.catalog') }}
          </span>
        </NuxtLink>

        <NuxtLink :to="`/${storeSlug}/contact`" class="text-neutral-500">
          <span>{{ $t('general.contact') }}</span>
        </NuxtLink>
      </div>

      <div class="w-1/2 flex items-center justify-center space-x-6">
        <InputSearch v-model:search="search" class="w-1/3" />

        <fa-icon :icon="['far', 'user']" class="text-2xl text-neutral-500" />
        <div class="relative">
          <NuxtLink :to="`/${storeSlug}/cart`">
            <fa-icon
              :icon="['fas', 'bag-shopping']"
              class="text-2xl text-neutral-500"
            />
            <span
              class="absolute -bottom-1 -right-1 text-xs rounded-full bg-blue-600 text-white w-[18px] h-[18px] flex items-center justify-center px-1"
            >
              {{ numberOfItems > 9 ? '9+' : numberOfItems }}
            </span>
          </NuxtLink>
        </div>
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
        :to="`/${storeSlug}`"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon :icon="['fas', 'home']" class="text-neutral-500 text-xl" />
        <span class="text-neutral-900 text-xl">
          {{ $t('general.home') }}
        </span>
      </NuxtLink>
      <NuxtLink
        :to="`/${storeSlug}/products`"
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
        :to="`/${storeSlug}/contact`"
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
        :to="`/${storeSlug}/login`"
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

const route = useRoute()
const companyId = computed(() => route.params.slug as string)
export default {
  async setup() {
    const store = useStore()
    await store.fetchCompanyData(companyId.value)
    store.fetchCart()
    const numberOfItems = computed(() =>
      store.cart.products.reduce((acc, p) => acc + p.quantity, 0)
    )
    return {
      numberOfItems,
    }
  },
  data() {
    const store = useStore()
    return {
      showNav: false,
      screenWidth: 0,
      shopName: store.company?.storeName ?? '',
      storeSlug: store.company?.storeSlug ?? '',
      search: '',
      logo: store.company?.logo,
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
