import { useRouter } from 'next/router'
import { useEffect } from 'react'

const PricingPlanCountry = () => {
    const router = useRouter()
    const { planId, selectedCountry } = router.query

    useEffect(() => {
        if (planId && selectedCountry) {
            
        }
    }, [planId, selectedCountry])

    
    if (!planId || !selectedCountry) {
        return <p>Loading...</p> 
    }

    return (
        <div>
            <h1>Subscription Plan: {planId}</h1>
            <h2>Selected Country: {selectedCountry}</h2>
        </div>
    )
}

export default PricingPlanCountry
