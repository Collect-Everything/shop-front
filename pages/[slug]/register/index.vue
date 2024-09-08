<template>
  <div class="flex justify-center w-full min-h-[calc(100vh-80px)] py-20 items-center">
    <div class="space-y-4 max-w-lg w-full container mx-auto px-4">
      <div class="flex flex-col items-center justify-center space-y-4 w-full">
        <span class="text-xl font-bold">{{ $t('login.register') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="lastName">
            {{ $t('register.lastName') }}
          </label>
          <input id="lastName" v-model="lastName" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="firstName">
            {{ $t('login.firstName') }}
          </label>
          <input id="firstName" v-model="firstName" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="email">{{ $t('login.email') }}</label>
          <input id="email" v-model="email" type="email" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="input flex items-center justify-between h-10">
            <input
              id="password"
              ref="password"
              v-model="password"
              type="password"
              class="w-full"
              :placeholder="$t('login.passwordPlaceholder')"
              :minlength="8"
            />
            <fa-icon
              :icon="['fas', 'eye']"
              @click="
                ;($refs.password as HTMLInputElement).type =
                  ($refs.password as HTMLInputElement).type === 'password'
                    ? 'text'
                    : 'password'
              "
            />
          </div>
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="passwordConfirm">{{ $t('login.passwordConfirm') }}</label>
          <div class="input flex items-center justify-between h-10">
            <input
              id="passwordConfirm"
              ref="passwordConfirm"
              v-model="passwordConfirm"
              type="password"
              class="w-full"
              :minlength="8"
            />
            <fa-icon
              :icon="['fas', 'eye']"
              @click="
                ;($refs.passwordConfirm as HTMLInputElement).type =
                  ($refs.passwordConfirm as HTMLInputElement).type ===
                  'password'
                    ? 'text'
                    : 'password'
              "
            />
          </div>
        </div>

        <span
          v-if="!passwordEquals && password.length >= 8"
          class="text-sm text-red-600"
        >
          {{ $t('login.differentPasswords') }}
        </span>
      </div>

      <button class="btn-secondary w-full" @click="register">
        <fa-icon :icon="['fas', 'sign-in-alt']" />
        <span>{{ $t('login.register') }}</span>
      </button>

      <div class="flex items-center space-x-1 justify-center">
        <span class="text-sm text-gray-500">{{ $t('login.account') }}</span>
        <span
          class="text-sm font-semibold cursor-pointer text-secondary"
          @click="$router.push('/login')"
        >
          {{ $t('login.login') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '~/store'

export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    }
  },
  computed: {
    passwordEquals(): boolean {
      return this.password === this.passwordConfirm
    },
  },
  methods: {
    async register() {
      const store = useStore()
      const router = useRouter()
      try {
      await $fetch('http://localhost:3102/api/v1/company-customers/register', {
        method: 'POST',
        body: {
          lastname: this.lastName,
          firstname: this.firstName,
          email: this.email,
          password: this.password,
          companyId: store.company?.id
        },
      })

      this.$toast.success('Inscription réussie')

      router.push(`/${store.company?.storeSlug}/login`)
      } catch (e) {
        this.$toast.error('Une erreur est survenue, veuillez reessayer')
      }

    },
  },
}
</script>
