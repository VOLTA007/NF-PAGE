// import React, { useRef, useEffect } from 'react'
// import Flickity from 'flickity'
// import 'flickity/css/flickity.css'
// import { Image } from '@nextui-org/react'

// const SimpleSlider = () => {
//     const flickityRef = useRef(null)
//     const imgsRef = useRef([])

//     // Declare domain variable based on environment
//     const domain =
//         process.env.NODE_ENV === 'production'
//             ? 'https://nutrifit-neon.vercel.app/'
//             : 'http://localhost:3000/'

//     console.log(domain)

//     useEffect(() => {
//         let flickityInstance = null

//         const initializeFlickity = () => {
//             flickityInstance = new Flickity(flickityRef.current, {
//                 imagesLoaded: true,
//                 percentPosition: false,
//                 autoPlay: 3000,
//                 pauseAutoPlayOnHover: false,
//                 selectedAttraction: 0.01,
//                 friction: 0.25,
//                 initialIndex: 1,
//                 cellAlign: 'center',
//                 draggable: true,
//                 prevNextButtons: false,
//                 setGallerySize: true,
//             })

//             flickityRef.current.flickityInstance = flickityInstance

//             flickityInstance.on('scroll', handleParallaxEffect)
//         }

//         const handleParallaxEffect = () => {
//             if (!flickityInstance) return

//             flickityInstance.slides.forEach((slide, index) => {
//                 const imgElement = imgsRef.current[index]
//                 if (!imgElement) return

//                 const x = (slide.target + flickityInstance.x) * -1 * 0.01 // Adjust the parallax effect factor here
//                 imgElement.style.transform = `translateX(${x}px)`
//             })
//         }

//         initializeFlickity()

//         // Cleanup function
//         return () => {
//             if (flickityInstance) {
//                 flickityInstance.destroy()
//             }
//         }
//     }, [])

//     return (
//         <div className="carousel" ref={flickityRef}>
//             <div className="carousel-cell">
//                 <Image
//                     width={300}
//                     height={200}
//                     className="img"
//                     ref={(el) => (imgsRef.current[0] = el)}
//                     src={`https://app.requestly.io/delay/2000/${domain}gyman.jpg`}
//                     alt="Gym 1"
//                 />
//             </div>
//             <div className="carousel-cell">
//                 <Image
//                     width={300}
//                     height={200}
//                     className="img"
//                     ref={(el) => (imgsRef.current[1] = el)}
//                     src={`https://app.requestly.io/delay/2000/${domain}gyma.jpg`}
//                     alt="Gym 2"
//                 />
//             </div>
//             <div className="carousel-cell">
//                 <Image
//                     width={300}
//                     height={200}
//                     className="img"
//                     ref={(el) => (imgsRef.current[2] = el)}
//                     src={`https://app.requestly.io/delay/2000/${domain}gymaa.jpg`}
//                     alt="Gym 3"
//                 />
//             </div>
//         </div>
//     )
// }

// export default SimpleSlider
