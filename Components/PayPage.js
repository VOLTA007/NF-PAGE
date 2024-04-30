import React from 'react'
import { generateKashierOrderHash } from '@/utils/generateKashierOrderHash'
import config from '@/utils/Config2'
import domain from '@/utils/Config'
import { useRouter } from 'next/router'
import { Button } from '@nextui-org/react'

const PayPage = ({ amount, currency }) => {
    const router = useRouter()

    const { baseUrl } = config
    const configObj = config[config.mode]

    const formattedAmount = amount ? amount.toString() : '400.00'

    const order = {
        amount: formattedAmount,
        currency: currency || 'EGP',
        merchantOrderId: Date.now(),
        mid: configObj.mid,
        secret: configObj.PaymentApiKey,
        baseUrl: configObj.baseUrl,
        metaData: JSON.stringify({
            'Cutomer Email': '',
        }),
        merchantRedirect: `${domain}/payment-redirect`,
        display: 'en',
        failureRedirect: 'true',
        redirectMethod: 'get',
        allowedMethods: 'card,wallet,fawry',
        brandColor: 'rgba(163, 0, 0, 1)',
    }

    const handleButtonClick = () => {
        const hppUrl =
            `${configObj.baseUrl}?` +
            `merchantId=${order.mid}` +
            `&orderId=${order.merchantOrderId}` +
            `&amount=${order.amount}` +
            `&currency=${order.currency}` +
            `&hash=${generateKashierOrderHash(order)}` +
            `&merchantRedirect=${order.merchantRedirect}` +
            `&metaData=${
                order.metaData ? encodeURIComponent(order.metaData) : ''
            }` +
            `&allowedMethods=${
                order.allowedMethods ? order.allowedMethods : ''
            }` +
            `&failureRedirect=${
                order.failureRedirect ? order.failureRedirect : ''
            }` +
            `&redirectMethod=${
                order.redirectMethod ? order.redirectMethod : ''
            }` +
            `&display=${order.display ? order.display : ''}` +
            `&brandColor=${encodeURIComponent(order.brandColor)}` +
            `&mode=${configObj.mode}`

        // Open hppUrl in a new tab
        const newTab = window.open(hppUrl, '_blank')

        // Navigate to /Academy/Profile
        router.push('/Academy/Profile')
    }

    return (
        <div>
            <Button
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                onClick={handleButtonClick}
            >
                Pay Now!
            </Button>
        </div>
    )
}

export default PayPage
