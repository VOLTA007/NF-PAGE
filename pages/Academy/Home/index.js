import React from 'react'
import Userwelcome from '@/Components/Userwelcome'
import { Image } from '@nextui-org/react'



export default function Home() {
    return (
        <>
            <div className="bg-[#fffaf6] dark:bg-slate-800 w-fill h-[80vh] rounded-[30px] lg:mx-10 mt-4 mx-2">
                <Userwelcome />

                <div className="grid grid-cols-[repeat(2,1fr)] grid-rows-[1fr] gap-x-0 gap-y-0">
                    <div className="flex justify-center ">
                        <h1 className="text-7xl inter-unique slant-10">
                            IM Abdalrahman,<br></br> your Nutritionist
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            isBlurred
                            width={410}
                            src="/Abdo.jpg"
                            alt="NextUI Album Cover"
                            className="m-5"
                        />
                    </div>
                </div>
            </div>
            <div
                className="h-screen"
                style={{ height: 'calc(100vh - 590px)' }}
            ></div>
        </>
    )
}
