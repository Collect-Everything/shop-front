<template>
  <div class="flex flex-col items-center text-center space-y-6 pb-4">
    <div
      class="bg-black w-full max-h-96 relative flex items-center justify-center text-center"
    >
      <img
        :src="backgroundImage"
        alt="bg-image"
        class="opacity-40 h-96 object-cover"
      />
      <div class="absolute">
        <div class="flex flex-col items-center space-y-4 px-6">
          <span class="text-4xl font-bold text-white">
            {{ title }}
          </span>
          <span class="text-white">
            {{ description }}
          </span>
          <button
            :style="`background-color: ${color}`"
            class="btn"
            @click="$router.push('/products')"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center text-center space-y-6 px-4">
      <span class="text-3xl">Nos produits locaux et de saison</span>

      <span class="text-neutral-600">
        Chez la cagette locale, nous sommes fiers de travailler avec des
        producteurs locaux pour vous offrir des produits frais et de saison.
      </span>

      <div class="grid grid-cols-2 gap-4">
        <ProductItemCard v-for="item in items" :key="item.id" :product="item" />
      </div>

      <button
        :style="`background-color: ${color}`"
        class="btn w-fit"
        @click="$router.push('/products')"
      >
        Voir tous les produits
      </button>

      <div
        v-for="advantage in advantages"
        :key="advantage.id"
        class="flex flex-col justify-between space-y-4 p-4 bg-gray-200 min-h-28 w-full"
      >
        <!-- <fa-icon v-if="advantage.icon" :icon="['fas', advantage.icon]" /> -->
        <span class="font-semibold">{{ advantage.title }}</span>
        <span>{{ advantage.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from '~/store'

export default {
  setup() {
    const store = useStore()
    const { getProducts } = store

    const items = getProducts(6)

    return {
      items,
    }
  },
  data() {
    return {
      title: 'Bienvenue chez la cagette locale',
      description:
        'Découvrez notre sélection de produits de qualité, commandez en ligne et récupérez votre panier en magasin en un temps record',
      buttonText: 'Découvrez notre catalogue',
      backgroundImage: 'https://source.unsplash.com/1600x900/?grocery',
      color: '#3C7E44',
      advantages: [
        {
          id: 1,
          title: 'Produits locaux',
          description:
            'Nous travaillons avec des producteurs locaux pour vous offrir des produits frais et de qualité',
        },
        {
          id: 2,
          title: 'Service rapide',
          description:
            'Commandez en ligne et récupérez votre panier en magasin en un temps record',
        },
        {
          id: 3,
          title: 'Produits de saison',
          description:
            'Nous vous proposons des produits de saison pour une consommation plus responsable',
        },
      ],
    }
  },
}
</script>
