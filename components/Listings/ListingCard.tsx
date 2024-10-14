"use client"

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useMemo } from "react"
import {format} from "date-fns"
import { ptBR } from 'date-fns/locale'
import Image from "next/image"
import HeartButton from "../HeartButton"
import Button from "../Button"
interface ListingCardProps {
    data:Listing
    reservation?:Reservation
    onAction?:(id:string) => void
    disabled?:boolean
    actionLabel?:string
    actionId?:string 
    currentUser?:SafeUser | null
}

const ListingCard = ({data,reservation,onAction,actionLabel,actionId = "",currentUser,disabled}:ListingCardProps) => {

    const router = useRouter()
    const {getByValue} = useCountries()

    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e:React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if(disabled){
            return
        }

        onAction?.(actionId)
    },[onAction,actionId,disabled])

    const price = useMemo(() => {
        if(reservation){
           return reservation.totalPrice
        }
        return data.price
    },[reservation,data.price])

    const reservationdate = useMemo(() => {
        if (!reservation) {
            return null
        }
        const start = new Date(reservation.endDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP', { locale: ptBR })} - ${format(end, 'PP', { locale: ptBR })}`

    },[reservation])
  return (
    <div className="col-span-1 cursor-pointer group" onClick={() => router.push(`/listing/${data.id}`)}>
        <div className="fle flex-col gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <Image alt={data.title} fill src={data.imageSrc} className="object-cover w-full h-full group-hover:scale-110 transition" />
                <div className="absolute top-3 right-3">
                <HeartButton listingId={data.id} currentUser={currentUser} />
                </div> 
            </div>
            <div className="font-semibold text-lg ">
                {location?.region}, {location?.label}
            </div>
            <div className="font-light text-neutral-500">
                {reservationdate || data.category}
            </div>
            <div className="flex fflex-row items-center gap-1">
                <div className="font-semibold">
                    R$ {price}
                </div>
                {!reservation && (
                    <div className="font-light">
                        Diária
                    </div>
                )}
            </div>
            {onAction && actionLabel && (
                <Button 
                disabled={disabled}
                small
                label={actionLabel}
                onClick={handleCancel}
                 />
            )}
        </div>

    </div>
  )
}

export default ListingCard