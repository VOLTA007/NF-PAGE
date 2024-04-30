import React, { useEffect, useState } from 'react'
import Userwelcome from '@/Components/Userwelcome'
import { Image } from '@nextui-org/react'
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from '@nextui-org/react'

export default function Home() {
    const [isMobileWidth, setIsMobileWidth] = useState(null)

    const isMobileWidthHook = useMediaQuery('(max-width: 1023px)')

    useEffect(() => {
        const link = document.createElement('link')
        link.href =
            'https://fonts.googleapis.com/css2?family=Quicksand:wght@700&display=swap'
        link.rel = 'stylesheet'
        document.head.appendChild(link)

        return () => {
            document.head.removeChild(link)
        }
    }, [])


    useEffect(() => {
        setIsMobileWidth(isMobileWidthHook)
    }, [isMobileWidthHook])

    // Set different image widths based on isMobileWidth
    const imageWidth = isMobileWidth ? 320 : 550

    return (
        <>
            <div className="bg-[#fffaf6] dark:bg-slate-800 w-fill h-fit rounded-[30px] lg:mx-10 mt-4 mx-2">
                <Userwelcome />
                <div style={{ paddingBottom: '40px' }}></div>

                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-rows-[1fr] gap-x-0 gap-y-0">
                    <div className="flex flex-col">
                        <h1 className="md:text-7xl text-3xl inter-unique slant-10 text-center">
                            Im Abdalrahman,
                            <br />
                            your nutritionist
                        </h1>
                        <div className="text-center mt-4 mb-2 inter-unique slant-10 text-balance md:mt-16">
                            <p>
                                Join my journy to achieve optimal health through
                                balanced eating and lifestyle choices
                            </p>
                        </div>
                        <div className='flex justify-center items-center gap-4 md:mt-10 mt-10'>
                            <Button className='w-[180px] h-[50px]' color="success">Subscribe</Button>
                            <Button className='bg-white text-black'>Testomnials</Button>
                        </div>
                    </div>
                    <div className="flex justify-center mb-10 mr-10 md:mt-0 mt-6 ">
                        <Image
                            isBlurred
                            width={imageWidth}
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
