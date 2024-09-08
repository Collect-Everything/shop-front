import { useStore } from '~/store'
import { USER_STORAGE_KEY } from '~/types/auth'

export default defineNuxtRouteMiddleware((to) => {
  const store = useStore()

  if (!store.user) {
    const userFromCookies = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || 'null')
    if (userFromCookies) store.setUser(userFromCookies)
  }
})
