import Image from "next/image"

interface SelectionButtonProps {
    icon: any
    iconAlt: string
    name: string
    href: string
}


export default function SelectionButton({ icon, iconAlt, name, href }: SelectionButtonProps) {
    return (
        <a className="transition-opacity opacity-20 hover:opacity-100 m-10" href={href}>
            <div className="inline-flex flex-col justify-center items-center w-72 h-72 pt-5 rounded-3xl bg-transparent border-black border-4">
                <Image 
                    src={icon} 
                    alt={iconAlt} 
                    width={100}
                    height={100}
                />
                <div className="inline-flex items-center justify-center w-full h-20">
                    <span className="font-medium text-center text-2xl text-black max-w-60">{name}</span>
                </div>
            </div>
        </a>
    )
}