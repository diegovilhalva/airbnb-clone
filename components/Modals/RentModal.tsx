"use client"
import useRentModal from "@/app/hooks/useRentModal"
import Modal from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "../Navbar/Categories"
import CategoryInput from "../Inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../Inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../Inputs/Counter"
import ImageUpload from "../Inputs/ImageUpload"
import Input from "../Inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal()
  const router = useRouter()
  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading,setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: ''
    }
  })

  const category = watch('category')
  const location = watch('location')
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")
  const imageSrc = watch("imageSrc")
  const Map = useMemo(  
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep(value => value - 1)
  }

  const onNext = () => {
    setStep(value => value + 1)
  }

  const onSubmit :SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
        return onNext()
    }

    setIsLoading(true)

    axios.post('/api/listings',data)
    .then(() => {
      toast.success("Espaço anunciado com sucesso!")
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      rentModal.onClose()

    })
    .catch((error) => {
      toast.error("Ocorreu um erro, tente novamente mais tarde")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Criar"
    }

    return "Próximo"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return "Voltar"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Quais das opções descreve melhor o seu espaço?" subtitle="Escolher categoria" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item, index) => (
          <div key={index} className="col-span-1">
            <CategoryInput onClick={(category) => setCustomValue('category', category)}
              selected={category === item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
    </div>
  )
  console.log(location)
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Onde seu espaço está localizado?"
          subtitle="Ajude os hóspedes a te encontrar"
        />
        <CountrySelect onChange={(value) => setCustomValue('location', value)} value={location} />
        <Map center={location?.latlng} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Compartilhe informaççoe sobre seu espaço"
          subtitle="Quais são a comodidades do espaço?"
        />
        <Counter
          title="Hóspedes"
          subtitle="Quantos hóspedes são permitidos?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="Quartos"
          subtitle="Quantos quartos o espaço tem?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="Banheiros"
          subtitle="Quantos banheiros o espaço tem?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Adicione uma foto do seu espaço"
          subtitle="Mostre como é o seu espaço"
          
        />
        <ImageUpload
        value={imageSrc} 
        onChange={(value) => setCustomValue("imageSrc",value)}/>
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Como você descreveria  o seu espaço?"
          subtitle="Crie uma curta objetiva decrição"
        />
        <Input
          id="title"
          label="Título"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Descrição"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step == STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Agora faça seu preço"
          subtitle="Quanto você ira cobrar pela diária?"
        />
        <Input
          id="price"
          label="Preço"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }


  return (
    <Modal isOpen={rentModal.isOpen} onClose={rentModal.onClose} onSubmit={handleSubmit(onSubmit)} title="Anuncie seu espaço no Airbnb" actionLabel={actionLabel} secondaryActionLabel={secondaryActionLabel} secondaryAction={step === STEPS.CATEGORY ? undefined : onBack} body={bodyContent} />
  )
}

export default RentModal