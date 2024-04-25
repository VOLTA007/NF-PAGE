import PayPage from '@/Components/PayPage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PricingPlanCountry = () => {
    const router = useRouter()
    const { planId, selectedCountry } = router.query

    const priceMapping = {
        beginner: {
            EGP: 400,
            USD: 50,
        },
        advanced: {
            EGP: 600,
            USD: 100,
        },
        premium: {
            EGP: 999,
            USD: 150,
        },
    }

    

    

    const [amounta, setAmounta] = useState(null)

    useEffect(() => {
        if (planId && selectedCountry) {
            // Determine the amount based on selected plan and country
            const plan = planId.toLowerCase()
            const country = selectedCountry.toUpperCase()

            if (priceMapping[plan] && priceMapping[plan][country]) {
                setAmounta(priceMapping[plan][country])
            }
        }
    }, [planId, selectedCountry])


    return (
        <>
            <div style={{ paddingTop: '20px' }}></div>
            <div className="lg:flex justify-center items-center pl-4 pr-4">
                <div className="bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-grey-950 overflow-hidden rounded-xl border border-grey-900 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat text-nowrap lg:mx-[300px] mx-3 px-[10px] py-3 shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
                    <div className="grid py-1 justify-start place-items-center mx-auto max-w-8xl"></div>
                    <h1 className="text-4xl lg:text-5xl pb-4 text-center lg:pb-4 lg:pt-4">
                        Checkout Details
                    </h1>
                    <h1 className="pb-4">Subscription Plan: {planId}</h1>
                    <h2 className="pb-4">
                        Selected Currency: {selectedCountry}
                    </h2>
                    {amounta && (
                        <p className="pb-4">
                            Amount:{' '}
                            {selectedCountry === 'EGP'
                                ? `${amounta} EGP`
                                : `$${amounta} USD`}
                        </p>
                    )}
                    <PayPage amount={amounta} currency={selectedCountry} />
                </div>
            </div>
            <div
                className="h-screen"
                style={{ height: 'calc(100vh - 560px)' }}
            ></div>
        </>
    )
}

export default PricingPlanCountry
