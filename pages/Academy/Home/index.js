import React from 'react'
import Userwelcome from '@/Components/Userwelcome'
import { Image } from '@nextui-org/react'




export default function Home() {
    return (
        <>
            <div className="bg-[#fffaf6] dark:bg-slate-800 w-fill h-fit rounded-[30px] lg:mx-10 mt-4 mx-2">
                <Userwelcome />
                <div style={{ paddingBottom: '40px' }}></div>

                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-rows-[1fr] gap-x-0 gap-y-0 ">
                    <div className="flex justify-center ">
                        <h1 className="md:text-7xl text-3xl inter-unique slant-10 text-center">
                            IM Abdalrahman,<br></br> your Nutritionist
                        </h1>
                    </div>
                    <div className=" flex justify-center mr-10 md:mt-0 mt-6">
                        <Image
                            isBlurred
                            width={310}
                            src="/Abdo.jpg"
                            alt="Doctor Image"
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
