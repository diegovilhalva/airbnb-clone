"use client"


import Image from "next/image";
import Heading from "../Heading";
import HeartButton from "../HeartButton"; 
import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

type Props = {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
};

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: Props) {
  const {getByValue} = useCountries()

  const location = getByValue(locationValue)


  return (
    <>
      <Heading
        title={title}
       subtitle={`${location?.region}, ${location?.label}`}

      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt={location?.label || "image"} fill className="object-cover w-full"  />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
      
    </>
  );
}

export default ListingHead;