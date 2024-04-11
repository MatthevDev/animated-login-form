'use client'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, LogIn } from "lucide-react"
import { redirect } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const schema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(5).max(50),
})

const LoginForm = ({onSubmit, setIsVisible}: {onSubmit: SubmitHandler<z.infer<typeof schema>>, setIsVisible: Function}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const generateTimeout = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
    }

    const submitHandler = async(data: z.infer<typeof schema>) => {
        setIsLoading(true)
        setIsRedirecting(false)

        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 1500)

        await generateTimeout()

        onSubmit(data)
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}
            className={cn("flex flex-col space-y-8 w-full")}>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="w-full space-y-6">
                            <FormLabel className="text-2xl">Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="w-full space-y-6">
                            <FormLabel className="text-2xl">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-center items-center">
                    <Button disabled={isLoading} size={'lg'} variant={'ghost'} type="submit"
                    className="rounded-lg bg-zinc-900 hover:bg-zinc-700 font-bold">
                        Sign in
                        {!isLoading ?
                            <LogIn className="w-4 h-4 ml-2" /> :
                            <Loader2 className="w-4 h-4 animate-spin ml-2" />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

const Page = () => {
    const router = useRouter()

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true) 
    }, [])

    return (
        <div className={cn('bg-black text-white w-full h-screen flex justify-center items-center',
            isVisible ? 'animate-fadein fill-mode-forwards' : 'opacity-0 animate-fadeoutfull fill-mode-forwards',
        )}>
            <div className="w-1/4">
                <div className="mb-8 text-5xl">
                    <h1 className="w-full text-center font-bold">
                        Join us{' '}
                        <span className="hover:text-blue-400 hover:cursor-pointer duration-500 transition-colors text-blue-600 font-extrabold underline underline-offset-8">now</span>
                        <span className="animate-dot">.</span>
                    </h1>
                </div>
                <LoginForm onSubmit={(data: z.infer<typeof schema>) => {router.push(`/welcome?username=${data.username}`)}}
                setIsVisible={setIsVisible} />
            </div>
        </div>
    )
}

export default Page