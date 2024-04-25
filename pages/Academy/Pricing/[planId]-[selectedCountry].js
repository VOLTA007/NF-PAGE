import PayPage from '@/Components/PayPage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PricingPlanCountry = () => {
    const router = useRouter()
    const { planId, selectedCountry } = router.query

    const priceMapping = {
        beginner: {
            EGP: 400,
            USD: 100,
        },
        advanced: {
            EGP: 600,
            USD: 200,
        },
        premium: {
            EGP: 999,
            USD: 300,
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

    if (!planId || !selectedCountry) {
        return <div></div>
    }

    return (
        <>
            <h1 className="text-5xl">Payment Details</h1>
            <h1>Subscription Plan: {planId}</h1>
            <h2>Selected Currency: {selectedCountry}</h2>
            {amounta && (
                <p>
                    Amount:{' '}
                    {selectedCountry === 'EGP'
                        ? `${amounta} EGP`
                        : `$${amounta} USD`}
                </p>
            )}
            <PayPage amount={amounta} currency={selectedCountry} />
        </>
    )
}

export default PricingPlanCountry
