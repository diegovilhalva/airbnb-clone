import EmptyState from "@/components/EmptyState"
import ClientOnly from "@/components/ClientOnly"
import getCurrentUser from "../actions/getCurrentUser"
import getReservation from "../actions/getResertvations"
import ReservationsClient from "./ReservationsClient"




const ReservationsPage = async () => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return (
            <ClientOnly>
              <EmptyState title="Não autorizado" subTitle="Faça login para continuar" />
            </ClientOnly>
          )
    }

    const reservations =await getReservation({
        authorId:currentUser.id
    })

    if (reservations.length === 0) {
        return (
          <ClientOnly>
            <EmptyState
              title="Nenhuma reserva encontrada"
              subTitle="Suas propriedades ainda não possuem reservas"
            />
          </ClientOnly>
        );
      }

  return (
    <ClientOnly>
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
         />
    </ClientOnly>    
  )
}

export default ReservationsPage