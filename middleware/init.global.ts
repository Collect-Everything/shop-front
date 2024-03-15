import { useStore } from '~/store'

const fetchDataMiddleware = async ({ store }) => {
    console.log('Fetching data from the server');

    const piniaStore = useStore()

    // Utilisez les méthodes de votre store Pinia pour récupérer les données nécessaires
    await piniaStore.fetchProducts()

    // Vous pouvez également définir d'autres données nécessaires ici

    // Par exemple, si vous souhaitez stocker les produits récupérés dans le state de Vuex pour y accéder plus tard
    // store.commit('setProducts', piniaStore.products)
}

export default fetchDataMiddleware

// TODO recuperer les produits + cart du localStorage