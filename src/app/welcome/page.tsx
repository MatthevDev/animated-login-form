'use client'
import AnimatedWelcome from "@/components/AnimatedWelcome";
import { redirect, useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams()
    const username = searchParams.get('username')
    if(!username) redirect('/login')

    return (
        <div className="bg-black text-white flex justify-center items-center h-screen w-full">
            <AnimatedWelcome username={username} />
        </div>
    );
}

export default Page