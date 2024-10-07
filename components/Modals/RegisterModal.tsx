"use client"

import axios from "axios"
import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import useRegisterModal from "@/app/hooks/useregisterModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../Inputs/Input"

const RegisterModal = () => {

  const registerModal = useRegisterModal()

  const [isLoading,setIsLoading] = useState(false)

  const {register,handleSubmit,formState:{
    errors
  }} = useForm<FieldValues>({
    defaultValues:{
      name:"",
      email:"",
      password:""
    }
  })

  const onSubmit:SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)
    axios.post("/api/register",data)
    .then(() => {
      registerModal.onClose()
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem vindo ao Airbnb" subtitle="Criar conta" />
      <Input />
    </div>
  )
  return (
    <Modal 
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Registrar"
    actionLabel="Continuar" 
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
     />
  )
}

export default RegisterModal