"use client"

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container from "../Container"
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { usePathname, useSearchParams } from "next/navigation";
import CategoryBox from "../CategoryBox";


export const categories = [
    {
      label: "Praias",
      icon: TbBeach,
      description: "Essa propriedade fica próxima à praia!",
    },
    {
      label: "Eco-Friendly",
      icon: GiWindmill,
      description: "Essa propriedade utiliza energia sustentável!",
    },
    {
      label: "Retiro Urbano",
      icon: MdOutlineVilla,
      description: "Essa propriedade oferece uma estadia moderna na cidade!",
    },
    {
      label: "Campo",
      icon: TbMountain,
      description: "Essa propriedade está localizada em uma área rural tranquila!",
    },
    {
      label: "Piscinas Privadas",
      icon: TbPool,
      description: "Essa propriedade tem uma piscina privativa luxuosa!",
    },
    {
      label: "Ilhas",
      icon: GiIsland,
      description: "Essa propriedade fica em uma ilha deslumbrante!",
    },
    {
      label: "Beira do Lago",
      icon: GiBoatFishing,
      description: "Essa propriedade está localizada à beira de um lago sereno!",
    },
    {
      label: "Esqui",
      icon: FaSkiing,
      description: "Essa propriedade oferece ótimas atividades de esqui!",
    },
    {
      label: "Castelos",
      icon: GiCastle,
      description: "Essa propriedade é um grandioso castelo histórico!",
    },
    {
      label: "Cavernas",
      icon: GiCaveEntrance,
      description: "Essa propriedade está situada em uma caverna única!",
    },
    {
      label: "Camping",
      icon: GiForestCamp,
      description: "Essa propriedade oferece uma experiência imersiva de camping!",
    },
    {
      label: "Ártico",
      icon: BsSnow,
      description: "Essa propriedade está em um belo ambiente ártico!",
    },
    {
      label: "Oásis",
      icon: GiCactus,
      description: "Essa propriedade está localizada em um tranquilo deserto!",
    },
    {
      label: "Fazendas",
      icon: GiBarn,
      description: "Essa propriedade é um retiro acolhedor em uma fazenda!",
    },
    {
      label: "Luxo",
      icon: IoDiamond,
      description: "Essa propriedade oferece uma estadia luxuosa em uma villa privativa!",
    },
  ];
  


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
  
    const isMainPage = pathname === "/";
  
    
    
    if (!isMainPage) {
      return null;
    }
   

  return (
    <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((items, index) => (
          <CategoryBox
            key={index}
            icon={items.icon}
            label={items.label}
            selected={category === items.label}
          />
        ))}
        </div>
    </Container>
  )
}

export default Categories