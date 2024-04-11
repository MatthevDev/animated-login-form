'use client'

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

const Page = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const username = searchParams.get('username')

    if(!username) redirect('/login')

    const [isVisible, setIsVisible] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        setIsVisible(true) 
    }, [])

    return (
        <div className={cn(isVisible ? "animate-fadein fill-mode-forwards" : "opacity-0",
            'p-12',
            fadeOut ? 'animate-fadeoutfull fill-mode-forwards' : '',
        )}>
            <div className="after:h-0.5 after:mt-4 after:w-full after:bg-zinc-800 after:block mb-8">
                <h1 className="mx-12 text-4xl font-semibold">Dashboard</h1>
                <Button variant="ghost" className="absolute right-24 top-12" onClick={() => {
                    setFadeOut(true)
                    const timeout = setTimeout(() => {
                        router.push("/login")
                    }, 500)
                }}>
                    Log Out <LogOut className="w-6 h-6 ml-4" />
                </Button>
            </div>
            <div className="grid grid-cols-2">
                <div className="px-12">
                    <h2 className="text-2xl font-medium text-center mb-6 underline underline-offset-4">Statistics</h2>
                    <div className="flex justify-center items-center flex-col space-y-4">
                        {Array.from({length: 6}).map((_, i) => (
                            <div key={i} className="w-2/3 h-12 bg-zinc-800 rounded-md animate-pulse"></div>
                        ))}
                    </div>
                </div>
                <div className="px-12">
                    <h2 className="text-2xl font-medium text-center mb-6 underline underline-offset-4">Options</h2>
                    <div className="w-full flex flex-col justify-center items-center space-y-4">
                        {Array.from({length: 3}).map((_, i) => (
                            <div key={i} className="w-2/3 h-12 flex justify-center items-center space-x-12">
                                <div className="w-full h-12 text-xl text-center flex justify-center items-center">Option Name:</div>
                                <div className="w-full h-12 bg-zinc-800 rounded-md animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page