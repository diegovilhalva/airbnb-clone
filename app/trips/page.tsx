import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getResertvations"
import TripsClient from "./TripsClient"



const TripsPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return (
          <ClientOnly>
            <EmptyState title="Não autorizado" subTitle="Faça login para continuar" />
          </ClientOnly>
        );
      }

      const reservations = await getReservation({
        userId:currentUser.id
      })
      if (reservations.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="Nenhuma viagem encontrada"
              subTitle="Vocẽ ainda não fez nunhuma viagem com Airbnb"
            />
          </ClientOnly>
        );
      }


  return (
   <ClientOnly>
    <TripsClient reservations={reservations} currentUser={currentUser} />
   </ClientOnly>
  )
}

export default TripsPage