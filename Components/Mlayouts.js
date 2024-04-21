// 'use client'
// import React, { useState } from 'react'
// import { NavbarContent, NextUIProvider } from '@nextui-org/react'
// import { SessionProvider } from 'next-auth/react'
// import Footer from './Footer'
// import NavBar2 from './NavBar2'
// import Innernav from './Innernav'
// import Header from './Header'
// import NavbarDesktop from './NavbarDesktop'


// export const Mlayouts = ({ children }) => {

    
//     // const [isactive, setIsactive] = useState(false)

//     // const variants = {
//     //     open: {
//     //         width: 480,
//     //         height: 650,
//     //         top: '-25px',
//     //         right: '-25px',
//     //         transition: {
//     //             duration: 0.75,
//     //             ease: [0.76, 0, 0.24, 1],
//     //         },
//     //     },
//     //     closed: {
//     //         width: 100,
//     //         height: 40,
//     //         top: '0px',
//     //         right: '0px',
//     //         transition: {
//     //             duration: 0.75,
//     //             ease: [0.76, 0, 0.24, 1],
//     //             delay: 0.35,
//     //         },
//     //     },
//     // }


//     return (
//         <NextUIProvider>
//             <SessionProvider>
//                         {/* <div className="absolute right-0 z-10">
//                             <motion.div
//                                 className="w-[480px] h-[650px] bg-[#c9fd74] rounded-[25px] relative"
//                                 variants={variants}
//                                 animate={isactive ? 'open' : 'closed'}
//                                 initial="closed"
//                             >
//                                 <AnimatePresence>
//                                     {isactive && <Innernav />}
//                                 </AnimatePresence>
//                             </motion.div>
//                         </div> */}
//                         <Header />
//                         <NavbarDesktop />
//                         {children}
//                         <Footer />
//             </SessionProvider>
//         </NextUIProvider>
//     )
// }
