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
import toast from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import useLoginModel from "@/app/hooks/useLoginModal"

const RegisterModal = () => {

  const registerModal = useRegisterModal()
  const loginModal = useLoginModel()
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
      loginModal.onOpen()
    })
    .catch((error) => {
      toast.error("Ocorreu um erro!")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Bem vindo ao Airbnb" subtitle="Criar conta" />
      <Input id="email" label="Email" disabled={isLoading} errors={errors} register={register} required />
      <Input id="name" label="Nome" disabled={isLoading} errors={errors} register={register} required />
      <Input id="password" label="Senha" type="password" disabled={isLoading} errors={errors} register={register} required />
    </div>
  )


  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continuar com Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continuar com Github" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="text-neutral-500 text-center font-light">
        <div>
          Já possui uma conta? {" "}
          <span
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Fazer login
          </span>
        </div>
      </div>
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
    footer={footerContent}
     />
  )
}

export default RegisterModal