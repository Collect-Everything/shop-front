<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center w-full lg:xl:w-1/2 space-y-6 px-4">
      <div class="flex flex-col items-center space-y-4 w-full">
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
          <label for="phone">{{ $t('register.phone') }}</label>
          <input id="phone" v-model="phone" type="tel" class="input" />
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

      <div class="flex items-center space-x-1">
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
export default {
  data() {
    return {
      lastName: '',
      firstName: '',
      phone: '',
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
      await $fetch('http://localhost:3100/api/v1/company-customers/register', {
        method: 'POST',
        body: {
          lastName: this.lastName,
          firstName: this.firstName,
          phone: this.phone,
          email: this.email,
          password: this.password,
        },
      })
    },
  },
}
</script>
