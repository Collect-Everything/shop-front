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
      <div class="space-x-6">
        <fa-icon :icon="['fas', 'search']" class="text-2xl text-neutral-500" />
        <fa-icon
          :icon="['fas', 'bag-shopping']"
          class="text-2xl text-neutral-500"
        />
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

        <NuxtLink to="/catalog" class="text-neutral-500">
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

    <div v-if="!showNav" class="py-6">
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
        <span class="text-neutral-900 text-xl">Accueil</span>
      </NuxtLink>
      <NuxtLink
        to="/catalog"
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
        <span class="text-neutral-900 text-xl"> Contact </span>
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="flex items-center justify-center space-x-2"
        @click="showNav = false"
      >
        <fa-icon
          :icon="['fas', 'arrow-right-to-bracket']"
          class="text-neutral-500 text-xl"
        />
        <span class="text-neutral-900 text-xl">Connexion / Inscription</span>
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
