"use client"

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";


const Map = dynamic(() => import('../Map'),{
    ssr:false
})
interface ListingInfoProps {
    user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string; 
}
const ListingInfo = ({bathroomCount,category,description,guestCount,locationValue,roomCount,user}:ListingInfoProps) => {

    const {getByValue} = useCountries()
    const coordinates = getByValue(locationValue)?.latlng
    
  return (
    <div className="col-span-4 flex flex-col gap-8">
    <div className="flex flex-col gap-2">
      <div className=" text-xl font-semibold flex flex-row items-center gap-2">
        <div>Anfitriã(o): {user?.name}</div>
        <Avatar src={user?.image}/>
      </div>
      <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
        <p>{guestCount} Hóspedes</p>
        <p>{roomCount} Quartos</p>
        <p>{bathroomCount} Banheiros</p>
      </div>
    </div>
    <hr />
    {category && (
      <ListingCategory
        icon={category.icon}
        label={category?.label}
        description={category?.description}
      />
    )}
    <hr />
  
    <hr />
    <p className="text-lg font-light text-neutral-500">{description}</p>
    <hr />
    <p className="text-xl font-semibold">{`Onde você estará`}</p>
    <Map center={coordinates} locationValue={locationValue} />
  </div>
  )
}

export default ListingInfo