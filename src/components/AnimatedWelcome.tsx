'use client'

import { cn } from "@/lib/utils"
import { ArrowBigRightDash } from "lucide-react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AnimatedWelcomeProps {
    username: string 
}

const AnimatedWelcome = ({username}: AnimatedWelcomeProps) => {
    if(!username) redirect('/login')
    const router = useRouter()

    useEffect(() => {
        const timeout2 = setTimeout(() => {
            router.push(`/dashboard?username=${username}`)
        }, 3500)
        return() => clearTimeout(timeout2)
    }, [router])

    return (
        <div className="animate-fadeoutfull delay-2500 duration-1000 fill-mode-forwards">
            <div className="w-full text-center 
            text-7xl font-bold space-x-6 p-0 m-0">
                <span className={cn("inline-block fill-mode-forwards opacity-0 transform transition-all duration-500 delay-500 animate-downup")}>
                    Hey,
                </span> 
                <span className={cn("inline-block fill-mode-forwards opacity-0 transform transition-all duration-500 delay-1500 animate-downup")}>
                    {' '}{username}.
                </span> 
            </div>

            <div className="absolute bottom-24 left-1/2 -translate-x-1/2
            opacity-0 fill-mode-forwards animate-fadein delay-2500">
                <ArrowBigRightDash className="w-12 h-12" />
            </div>
        </div>
    )
}

export default AnimatedWelcome
