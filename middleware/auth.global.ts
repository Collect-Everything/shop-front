import { useStore } from '~/store'

export default defineNuxtRouteMiddleware((to) => {
  const user = useStore().user

  if (!user) {
    const userFromCookies = JSON.parse(localStorage.getItem('user') || 'null')
    if (userFromCookies) useStore().setUser(userFromCookies)
    else if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
