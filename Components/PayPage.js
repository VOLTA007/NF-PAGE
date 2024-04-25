import React from 'react'
import { generateKashierOrderHash } from '@/utils/generateKashierOrderHash'
import config from '@/utils/Config2'
import domain from '@/utils/Config'
import { useRouter } from 'next/router'

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
            'Cutomer Email': ``,
        }),
        merchantRedirect: `${domain}/payment-redirect`,
        display: 'en',
        failureRedirect: 'true',
        redirectMethod: 'get',
        allowedMethods: 'card,wallet,fawry',
        brandColor: 'rgba(163, 0, 0, 1)',
    }

    const handleDivClick = (event) => {
        event.preventDefault()

        // Navigate to /Academy/Profile
        router.push('/Academy/Profile')

        // Open hppUrl in a new tab
        window.open(hppUrl, '_blank')
    }


    order.hash = generateKashierOrderHash(order)

    const hppUrl =
        `${configObj.baseUrl}?` +
        `merchantId=${order.mid}` +
        `&orderId=${order.merchantOrderId}` +
        `&amount=${order.amount}` +
        `&currency=${order.currency}` +
        `&hash=${order.hash}` +
        `&merchantRedirect=${order.merchantRedirect}` +
        `&metaData=${order.metaData ? order.metaData : ''}` +
        `&allowedMethods=${order.allowedMethods ? order.allowedMethods : ''}` +
        `&failureRedirect=${
            order.failureRedirect ? order.failureRedirect : ''
        }` +
        `&redirectMethod=${order.redirectMethod ? order.redirectMethod : ''}` +
        `&display=${order.display ? order.display : ''}` +
        `&brandColor=${encodeURIComponent(order.brandColor)}` +
        `&mode=${configObj.mode}`

    return (
        <div onClick={handleDivClick}>
            <a
                className="bg-red-500 rounded-sm px-2 py-2"
                href={hppUrl}
                target="_blank"
                rel="noopener noreferrer"
            >
                Pay Now !
            </a>
            <br />

            <script
                id="kashier-iFrame"
                src={`${baseUrl}/kashier-checkout.js`}
                data-amount={order.amount}
                data-hash={order.hash}
                data-currency={order.currency}
                data-orderId={order.merchantOrderId}
                data-merchantId={order.mid}
                data-merchantRedirect={order.merchantRedirect}
                data-display={order.display}
                data-mode={config.mode}
                data-metaData={order.metaData}
                data-redirectMethod={order.redirectMethod}
                data-failureRedirect={order.failureRedirect}
                data-allowedMethods={order.allowedMethods}
                data-brandcolor={order.brandColor}
            ></script>
        </div>
    )
}

export default PayPage
