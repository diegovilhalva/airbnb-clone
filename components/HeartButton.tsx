"use client"
import { SafeUser } from "@/app/types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
    listingId: string;
    currentUser?: SafeUser | null;
}

const HeartButton = ({listingId,currentUser}:HeartButtonProps) => {
    const hasFavorite = false
    const toggleFavorite = () => {
        
    }
  return (
     <div
    onClick={toggleFavorite}
    className=" relative hover:opacity-80 transition cursor-pointer"
  >
    <AiOutlineHeart
      size={28}
      className="fill-white absolute -top-[2px] -right-[2px]"
    />
    <AiFillHeart
      size={24}
      className={hasFavorite ? "fill-[#FF5A5F]" : "fill-neutral-500/70"}
    />
  </div>
  )
}

export default HeartButton