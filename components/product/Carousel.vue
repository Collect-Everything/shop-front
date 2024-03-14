<template>
  <div class="flex flex-col space-y-2">
    <div class="overflow-hidden">
      <div ref="carousel" class="flex transition-transform duration-300">
        <div
          v-for="(photo, index) in photos"
          :key="index"
          class="w-full flex-shrink-0"
        >
          <img :src="photo" :alt="index" class="w-full h-auto" />
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center space-x-2">
      <div v-for="(photo, index) in photos" :key="index" class="w-3 h-3">
        <button
          :class="index === currentIndex ? 'bg-blue-600' : 'bg-gray-400'"
          class="w-full h-full rounded-full focus:outline-none"
          @click="goTo(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentIndex: 0,
      totalWidth: 0,
      startX: 0,
      moveX: 0,
      threshold: 50, // Seuil de déplacement en pixels pour passer à la photo suivante/précédente
    }
  },
  mounted() {
    this.initCarousel()
  },
  methods: {
    initCarousel() {
      const carousel = this.$refs.carousel
      this.totalWidth = Array.from(carousel.children).reduce(
        (acc, cur) => acc + cur.offsetWidth,
        0
      )

      carousel.addEventListener('touchstart', (e) => {
        this.startX = e.touches[0].clientX
        this.moveX = 0
      })

      carousel.addEventListener('touchmove', (e) => {
        this.moveX = e.touches[0].clientX - this.startX
      })

      carousel.addEventListener('touchend', () => {
        if (Math.abs(this.moveX) > this.threshold) {
          if (this.moveX > 0) {
            this.prevSlide()
          } else {
            this.nextSlide()
          }
        }
        this.moveX = 0
      })
    },
    nextSlide() {
      if (this.currentIndex < this.photos.length - 1) {
        this.currentIndex++
        this.goTo(this.currentIndex)
      }
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
        this.goTo(this.currentIndex)
      }
    },
    goTo(index) {
      this.currentIndex = index
      const carousel = this.$refs.carousel
      const itemWidth = carousel.children[0].offsetWidth
      this.setTranslate(-itemWidth * index)
    },
    setTranslate(translate) {
      const carousel = this.$refs.carousel
      const maxTranslate = 0
      const minTranslate = Math.min(0, carousel.offsetWidth - this.totalWidth)
      translate = Math.min(Math.max(translate, minTranslate), maxTranslate)
      carousel.style.transform = `translateX(${translate}px)`
    },
  },
}
</script>

<style scoped>
/* Ajoutez vos styles CSS ici */
</style>
