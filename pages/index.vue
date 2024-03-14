<template>
  <div class="flex flex-col text-center space-y-6">
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
            @click="$router.push('/catalog')"
          >
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>

    <span class="text-3xl">Nos produits locaux et de saison</span>

    <span class="text-neutral-600 px-4">
      Chez la cagette locale, nous sommes fiers de travailler avec des
      producteurs locaux pour vous offrir des produits frais et de saison.
    </span>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      title: 'Bienvenue chez la cagette locale',
      description:
        'Découvrez notre sélection de produits de qualité, commandez en ligne et récupérez votre panier en magasin en un temps record',
      buttonText: 'Découvrez notre catalogue',
      backgroundImage: 'https://source.unsplash.com/1600x900/?grocery',
      color: '#3C7E44',
    }
  },
}
</script>
