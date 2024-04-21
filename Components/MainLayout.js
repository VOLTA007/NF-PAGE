// 'use client'
// import { SessionProvider } from 'next-auth/react'
// import Footer from './Footer'
// import Header from './Header'
// import NavBarDesktop from './NavbarDesktop'
// import NavBar from './NavBar'
// import { useEffect, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { useRouter } from 'next/navigation'
// import { usePathname } from 'next/navigation'
// import { NextUIProvider } from '@nextui-org/react'
// import NavBar2 from './NavBar2'
// import Innernav from './Innernav'




// export default function MainLayout({ children }) {
//     const router = useRouter()
//     const [isMobile, setIsMobile] = useState(null)
//     const pathname = usePathname()
//     const [isactive, setIsactive] = useState(false)

//     const variants = {
//         open: {
//             width: 480,
//             height: 650,
//             top: '-25px',
//             right: '-25px',
//             transition: {
//                 duration: 0.75,
//                 ease: [0.76, 0, 0.24, 1],
//             },
//         },
//         closed: {
//             width: 100,
//             height: 40,
//             top: '0px',
//             right: '0px',
//             transition: {
//                 duration: 0.75,
//                 ease: [0.76, 0, 0.24, 1],
//                 delay: 0.35
//             },
//         },
//     }

//     useEffect(() => {
//         const checkIsMobile = () => {
//             const isMobileUserAgent =
//                 /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//                     navigator.userAgent
//                 )
//             setIsMobile(isMobileUserAgent)
//         }

//         checkIsMobile()
//     }, [])

//     if (isMobile === null) {
//         return <div></div>
//     }


//     return (
//         <NextUIProvider>
//             <SessionProvider>
//                 <AnimatePresence mode="wait">
//                     <motion.div key={pathname}>
//                         <motion.div
//                             className="absolute top-0 left-0 w-full h-screen bg-black origin-bottom z-40 rounded-t-[100px]"
//                             initial={{ scaleY: 0 }}
//                             animate={{ scaleY: 0 }}
//                             exit={{ scaleY: 1.5 }}
//                             transition={{
//                                 duration: 1,
//                                 ease: [0.22, 1, 0.36, 1],
//                             }}
//                         />
//                         <motion.div
//                             className="absolute top-0 left-0 w-full h-screen bg-black origin-top z-40 rounded-b-[100px]"
//                             initial={{ scaleY: 1.5 }}
//                             animate={{ scaleY: 0 }}
//                             exit={{ scaleY: 0 }}
//                             transition={{
//                                 duration: 1,
//                                 ease: [0.22, 1, 0.36, 1],
//                             }}
//                         />
//                         <Header />
//                         {isMobile ? <div></div> : <NavBarDesktop />}
//                         <div className="absolute right-0 z-10">
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
//                             <NavBar2
//                                 isactive={isactive}
//                                 setIsactive={setIsactive}
//                             />
//                         </div>

//                         <div>{children}</div>
//                         <div style={{ paddingTop: '120px' }}></div>
//                         <Footer />
//                     </motion.div>
//                 </AnimatePresence>
//             </SessionProvider>
//         </NextUIProvider>
//     )
// }
