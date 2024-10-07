"use client"
import { IconType } from "react-icons"

interface buttonProps {
    label: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    outline?: boolean
    small?: boolean
    icon?: IconType
}

const Button = ({ label, onClick, disabled, icon:Icon, outline, small }: buttonProps) => {
    return (
        <button className={`
    relative disabled:opacity-80 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white' : 'bg-[#FF5A5F]'} ${outline ? 'border-black' : 'border-[#FF5A5F]'} 
    ${outline ? 'text-black' : 'text-white'} ${small ? "py-1" : "py-3"}  ${small ? "text-sm" : "text-md"}  ${small ? "font-light" : "font-semibold"}  ${small ? "border-[1px]" : "border-2"}   
     `} onClick={onClick} disabled={disabled} >
        {Icon &&(
            <Icon size={24} className="absolute left-4 top-3" />
        )}
            {label}
        </button>
    )
}

export default Button