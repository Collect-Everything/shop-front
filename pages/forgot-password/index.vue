<template>
  <div class="center-component w-full md:lg:w-1/3">
    <div v-if="!token" class="flex flex-col items-center space-y-6 p-6">
      <div class="flex flex-col items-center space-y-4 w-full">
        <span class="text-xl font-bold">{{ $t('login.forgotPassword') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="email">{{ $t('login.email') }}</label>
          <input id="email" v-model="email" type="email" class="input" />
        </div>
      </div>

      <button class="btn-secondary w-full" @click="sendResetEmail()">
        <fa-icon :icon="['fas', 'rotate']" />
        <span>{{ $t('login.resetPassword') }}</span>
      </button>

      <div class="border-b w-full border-gray-300" />

      <div class="flex items-center space-x-1">
        <span class="text-sm text-gray-500">{{ $t('login.account') }}</span>
        <span
          class="text-sm font-semibold cursor-pointer"
          @click="$router.push('/login')"
        >
          {{ $t('login.login') }}
        </span>
      </div>
    </div>
    <div v-else class="flex flex-col items-center space-y-6 p-6">
      <div class="flex flex-col items-center space-y-4 w-full">
        <span class="text-xl font-bold">{{ $t('login.resetPassword') }}</span>

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
      </div>

      <button
        class="btn-secondary w-full"
        :disabled="!passwordEquals || password.length < 8"
        @click="resetPassword()"
      >
        <fa-icon :icon="['fas', 'rotate']" />
        <span>{{ $t('login.resetPassword') }}</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      token: '',
      password: '',
      passwordConfirm: '',
    }
  },
  computed: {
    passwordEquals(): boolean {
      return this.password === this.passwordConfirm
    },
  },
  mounted() {
    this.token = this.$route.query.token

    if (this.token) this.verifyToken()
  },
  methods: {
    verifyToken() {
      // TODO
    },
    sendResetEmail() {
      // TODO
    },
    resetPassword() {
      // TODO
    },
  },
}
</script>
