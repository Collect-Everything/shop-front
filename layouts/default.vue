<template>
  <div class="text-black h-screen w-full">
    <div
      v-if="screenWidth < 768"
      class="flex items-center justify-between px-4 h-20 fixed top-0 z-50 inset-x-0 bg-neutral-50"
    >
      <div class="flex gap-3 items-center">
        <fa-icon
          :icon="['fas', 'bars']"
          class="text-2xl"
          @click="showNav = !showNav"
        />
        <div class="flex gap-1 items-center">
          <NuxtImg
            v-if="logo"
            :src="logo"
            alt="logo"
            class="h-8 sm:h-10 w-10 sm:w-10 object-contain"
            crossorigin="anonymous"
          />
          <span class="font-semibold text-lg sm:text-xl">{{ shopName }}</span>
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative">
          <NuxtLink :to="`/${storeSlug}/cart`" class="p-2">
            <fa-icon
              :icon="['fas', 'bag-shopping']"
              class="text-xl text-neutral-400"
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
      class="fixed top-0 z-50 bg-neutral-50 border-b border-gray-300 w-full h-20 flex items-center"
    >
    <div class="flex items-center justify-between container px-4 mx-auto">
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
      </div>

      <div class="flex items-center justify-center space-x-6">

      <NuxtLink
        v-if="store.user"
        :to="`/${storeSlug}/login`"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon :icon="['far', 'user']" class="text-2xl text-neutral-500" />
      </NuxtLink>
      <NuxtLink
        v-if="!store.user"
        :to="`/${storeSlug}/login`"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
          <Button :text="'Se connecter'" :buttonClass="'whitespace-nowrap'" />
      </NuxtLink>
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
      </div>

    <div v-if="!showNav" class="min-h-[calc(100vh-80px)] py-20">
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
    <footer class="bg-neutral-100 py-8" v-if="!showNav">
      <div class="container px-4 mx-auto flex flex-col sm:flex-row gap-4 sm:gap-16">
        <div>
          <NuxtImg
            v-if="logo"
            :src="logo"
            alt="logo"
            class="h-10 w-10 object-contain"
            crossorigin="anonymous"
            />
          <p>{{store.company?.storeName}}</p>
          </div>
        <div class="grid grid-cols-1 sm:grid-cols-2">
        <div class="flex flex-col gap-2 text-neutral-500">
          <h3>Navigation</h3>
          <NuxtLink :to="`/${storeSlug}`">
            <p>Accueil</p>
            </NuxtLink>
          <NuxtLink :to="`/${storeSlug}/products`">
            <p>Catalogue</p>
          </NuxtLink>
        </div>
        <div class="flex flex-col gap-2 text-neutral-500" v-if="store.company?.emailContact || store.company?.phoneContact || store.company?.instagramUrl || store.company?.twitterUrl || store.company?.facebookUrl || store.company?.externalUrl">
        <h3>Contact</h3>
        <p>{{store.company?.emailContact}}</p>
        <p>{{store.company?.phoneContact}}</p>
        <p>{{store.company?.instagramUrl}}</p>
        <p>{{store.company?.twitterUrl}}</p>
        <p>{{store.company?.facebookUrl}}</p>
        <p>{{store.company?.externalUrl}}</p>
        </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import Button from '~/components/Button.vue';
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
      store
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
