import { useStore } from '~/store'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  const { setUser } = useStore()

  return {
    provide: {
      auth: {
        login: (email: string, password: string) => {
          // const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/login`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ email, password }),
          // })

          // const { user, token } = await res.json()

          const user = {
            id: 1,
            name: 'John Doe',
            email: 'john@doe.com',
          }
          const token = '1234567890'

          setUser(user)

          return { user, token }
        },
        logout: async () => {
          await fetch(`${runtimeConfig.API_GATEWAY_URL}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })

          setUser(null)
        },
        getUser: async () => {
          const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })

          const { user } = await res.json()

          setUser(user)

          return user
        },
      },
    },
  }
})
