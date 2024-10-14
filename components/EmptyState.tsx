"use client"

import { useRouter } from "next/navigation"
import Heading from "./Heading"
import Button from "./Button"

interface EmptyState{
    title?:string
    subTitle?:string
    showReset?:boolean

}

const EmptyState = ({showReset,subTitle="Tente mudar ou remover os filtros de pesquisa",title = "Nenhum resultado"}:EmptyState) => {

    const router = useRouter()
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
        <Heading center title={title} subtitle={subTitle} />
        <div className="w-45 mt-4">
            {showReset && (
                <Button outline label="Remover filtros" onClick={() => router.push("/")} />
            )}
        </div>
    </div>
  )
}

export default EmptyState