"use client"

import EmptyState from "@/components/EmptyState"
import { useEffect } from "react"

interface ErrorStateProps {
    error:Error
}



const ErrorState = ({error}:ErrorStateProps) => {
    useEffect(() => {
        console.log(error)
    },[error])
  return (
    <EmptyState title="Ops..."  subTitle="Desculpe, não conseguimos encontrar o que você procura. Tente novamente mais tarde."/>
  )
}

export default ErrorState