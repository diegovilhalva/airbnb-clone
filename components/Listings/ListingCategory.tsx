"use client"

import { IconType } from "react-icons";

interface ListingCatgoryProps {
    icon: IconType;
    label: string;
    description: string;
}

const ListingCategory = ({description,icon:Icon,label}:ListingCatgoryProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{label}</p>
          <p className="text-neutral-500 font-light">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default ListingCategory