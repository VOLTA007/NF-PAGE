import 'swiper/css'
import 'swiper/css/effect-cards'

import React, { useEffect, useState, useRef } from 'react'
import Userwelcome from '@/Components/Userwelcome'
import { Image } from '@nextui-org/react'
import { useMediaQuery } from '@react-hook/media-query'
import { Button } from '@nextui-org/react'
import { Card, CardFooter } from '@nextui-org/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards } from 'swiper/modules'

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
    const imageWidth = isMobileWidth ? 320 : 500

    return (
        <>
            <div className="bg-[#fffaf6] dark:bg-slate-800 w-fill h-fit rounded-[30px] lg:mx-10 mt-4 mx-2">
                <Userwelcome />
                <div style={{ paddingBottom: '40px' }}></div>

                <div className="grid md:grid-cols-[repeat(2,1fr)] grid-rows-[1fr] gap-x-0 gap-y-0">
                    <div className="flex flex-col justify-center md:mb-40">
                        <h1 className=" md:text-7xl text-3xl inter-unique slant-10 text-center">
                            Im Abdalrahman,
                            <br />
                            your nutritionist
                        </h1>
                        <div className=" text-center mt-4 mb-2 inter-unique slant-10 text-balance md:mt-16">
                            <p>
                                Join my journy to achieve optimal health through
                                balanced eating and lifestyle choices
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-4 md:mt-10 mt-10 mx-1">
                            <Card
                                isFooterBlurred
                                radius="lg"
                                className="border-none"
                            >
                                <Image
                                    alt=""
                                    className="object-cover dark:invert"
                                    height={200}
                                    src="/subscribe.gif"
                                    width={200}
                                />
                                <CardFooter className=" justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <p className="text-tiny text-black dark:text-white ">
                                        Choose Your Plan Now!
                                    </p>
                                    <Button
                                        className="text-tiny bg-black/20 text-black dark:text-white "
                                        variant="flat"
                                        color="default"
                                        radius="lg"
                                        size="sm"
                                    >
                                        Subscribe
                                    </Button>
                                </CardFooter>
                            </Card>
                            <Card
                                isFooterBlurred
                                radius="lg"
                                className="border-none"
                            >
                                <Image
                                    alt="Woman listing to music"
                                    className="object-cover dark:invert"
                                    height={200}
                                    src="/speech-bubble.gif"
                                    width={200}
                                />
                                <CardFooter className=" justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <p className="text-tiny text-black dark:text-white ">
                                        Our people Opinions
                                    </p>
                                    <Button
                                        className="text-tiny bg-black/20 text-black  dark:text-white"
                                        variant="flat"
                                        color="default"
                                        radius="lg"
                                        size="sm"
                                    >
                                        Testimonial
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                    <div className="flex justify-center items-center mb-10  md:mt-0 mt-6 overflow-hidden ">
                        <div>
                            <Swiper
                                effect={'cards'}
                                grabCursor={true}
                                modules={[EffectCards]}
                                className=" md:w-[400px] w-60 md:h-[400px] flex items-center justify-center rounded-[18px]"
                            >
                                <SwiperSlide>
                                    <Image src="/Abdo.jpg" alt="Doctor Image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image
                                        src="/1111111.jpg"
                                        alt="Doctor Image"
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </div>
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
