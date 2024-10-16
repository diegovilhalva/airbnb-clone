import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"

import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings"
import FavoritesClient from "./FavoritesClient"



const FavoritePage = async () => {
    const currentUser = await getCurrentUser()
    const listings= await getFavoriteListings()

    if (!currentUser) {
        return (
          <ClientOnly>
            <EmptyState title="Naõ autorizado" subTitle="Faça login para continuar" />
          </ClientOnly>
        );
      }
    

    if (listings.length === 0) {
        return (
            <ClientOnly>
            <EmptyState 
             title="Nenhum favorito encontrado"
             subTitle="Você não tem nenhum lugar favorito"
             />
        </ClientOnly>
        )
    }

  return (
   <ClientOnly>
    <FavoritesClient listings={listings} currentUser={currentUser} />
   </ClientOnly>
  )
}

export default FavoritePage