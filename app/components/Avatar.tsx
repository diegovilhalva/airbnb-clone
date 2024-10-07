"use client"

import Image from "next/image"

const Avatar = () => {
  return (
    <Image className="rounded-full" height={"40"} width={"40"} alt="avatar" src={"/images/placeholder.jpg"} />
  )
}

export default Avatar