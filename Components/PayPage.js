import React from 'react'
import { generateKashierOrderHash } from '@/utils/generateKashierOrderHash'
import config from '@/utils/Config2'
import domain from '@/utils/Config'
import { useSession } from 'next-auth/react'

const PayPage = ({ amount, currency }) => {

 

    const { data: session } = useSession()
    const userEmail = session.user.email

    const { baseUrl } = config
    const configObj = config[config.mode]

    const formattedAmount = amount ? amount.toString() : '1.00'

    const order = {
        amount: formattedAmount,
        currency: currency || 'EGP',
        merchantOrderId: Date.now(),
        mid: configObj.mid,
        secret: configObj.PaymentApiKey,
        baseUrl: configObj.baseUrl,
        metaData: JSON.stringify({
            'Cutomer Email': `${userEmail}`,
        }),
        merchantRedirect: `${domain}/payment-redirect`,
        display: 'en',
        failureRedirect: 'true',
        redirectMethod: 'get',
        allowedMethods: 'wallet,card',
        brandColor: 'rgba(163, 0, 0, 1)',
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
        <div>
            <a
                className="bg-red-500"
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
