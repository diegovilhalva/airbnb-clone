"use client"
import qs from "query-string"
import useSearchModal from '@/app/hooks/useSearchModal'
import Modal from './Modal'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import dynamic from 'next/dynamic'
import CountrySelect, { CountrySelectValue } from '../Inputs/CountrySelect'
import { formatISO } from "date-fns"
import Heading from "../Heading"
import Calendar from "../Inputs/Calendar"
import Counter from "../Inputs/Counter"


enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

const SearchModal = () => {
    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()
    const [location, setLocation] = useState<CountrySelectValue>()
    const [step, setStep] = useState(STEPS.LOCATION)
    const [guestCount, setGuestCount] = useState(1)
    const [roomCount, setRoomCount] = useState(1)
    const [bathroomCount, setBathroomCount] = useState(1)
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    })

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location])

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: "/",
            query: updatedQuery
        }, {
            skipNull: true
        })

        setStep(STEPS.LOCATION)

        searchModal.onClose()

        router.push(url)

    }, [step,
        searchModal,
        location,
        router,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        onNext,
        params])

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO){
            return "Pesquisar"
        }
        return "Próximo"
    },[step])

    const secondActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
          return undefined;
        }
    
        return "Voltar";
      }, [step])
      

      let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Para onde você quer ir?"
            subtitle="Encontre o lugar perfeito"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setLocation(value as CountrySelectValue)}
          />
          <hr />
          <Map center={location?.latlng} />
        </div>
      )

      if (step === STEPS.DATE) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Quando você vai?"
              subtitle="seleccione data que você gostaria de ir"
            />
            <Calendar
              onChange={(value) => setDateRange(value.selection)}
              value={dateRange}
            />
          </div>
        );
      }

      if (step === STEPS.INFO) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading title="Mais informações" subtitle="Encontre o lugar perfeito" />
            <Counter
              onChange={(value) => setGuestCount(value)}
              value={guestCount}
              title="Hóspedes"
              subtitle="Quantos hóspedes irá com você?"
            />
            <hr />
            <Counter
              onChange={(value) => setRoomCount(value)}
              value={roomCount}
              title="Quartos"
              subtitle="Quantos quartos você precisa?"
            />
            <hr />
            <Counter
              onChange={(value) => {
                setBathroomCount(value);
              }}
              value={bathroomCount}
              title="Banheiros"
              subtitle="Quantos banheiros você precisa?"
            />
          </div>
        );
      }
    
    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filtros"
            actionLabel='Pesquisar'
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            secondaryActionLabel={secondActionLabel}
            body={bodyContent}
        />
    )
}

export default SearchModal