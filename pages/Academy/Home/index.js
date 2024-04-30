import React, { useEffect, useState } from 'react'
import Userwelcome from '@/Components/Userwelcome'
import { Image } from '@nextui-org/react'
import { useMediaQuery } from '@react-hook/media-query'

export default function Home() {
    const [isMobileWidth, setIsMobileWidth] = useState(null)

    const isMobileWidthHook = useMediaQuery('(max-width: 1023px)') // Adjust width breakpoint as needed

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
                    <div className="flex justify-center">
                        <h1 className="md:text-7xl text-3xl inter-unique slant-10 text-center">
                            IM Abdalrahman,
                            <br />
                            your Nutritionist
                        </h1>
                    </div>
                    <div className="flex justify-center mr- md:mt-0 mt-6">
                        <Image
                            isBlurred
                            width={imageWidth} // Use the calculated imageWidth
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
