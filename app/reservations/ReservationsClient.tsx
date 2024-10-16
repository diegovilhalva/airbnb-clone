"use client"

import axios from "axios"
import { useCallback, useState } from "react"
import toast from "react-hot-toast"
import {SafeReservation,SafeUser} from "../types"
import Heading from "@/components/Heading"
import Container from "@/components/Container"
import ListingCard from "@/components/Listings/ListingCard"
import { useRouter } from "next/navigation"

interface ReservationsClientProps{
    reservations?:SafeReservation[]
    currentUser?:SafeUser | null    

}

const ReservationsClient = ({currentUser,reservations}:ReservationsClientProps) => {
    const router = useRouter()
    const [deleteingId,setDeletingId] = useState("")
    
    const onCancel = useCallback((id:string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reserva cancelada com sucesso!")
            router.refresh()
        })
        .catch((error) => {
            toast.error("Ocorreu um erro, tente novamente mais tarde")
        })
        .finally(() => {
            setDeletingId("")
        })
    },[router])
  return (
   <Container >
    <Heading title="Reservas" subtitle="Veja as reserva em suas propriedades" />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {reservations?.map((reservation) => (
            <ListingCard 
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteingId === reservation.id}
            actionLabel="Cancelar reserva"
            currentUser={currentUser}
            />
        ))}
    </div>
   </Container>
  )
}

export default ReservationsClient