import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import PageWrapper from '@/Components/PageWrapper'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { RecoilRoot } from 'recoil'
import Router from 'next/router'

export default function App({ Component, pageProps }) {
    const router = useRouter()

    const routeChange = () => {
        // Temporary fix to avoid flash of unstyled content
        // during route transitions. Keep an eye on this
        // issue and remove this code when resolved:
        // https://github.com/vercel/next.js/issues/17464

        const tempFix = () => {
            const allStyleElems = document.querySelectorAll('style[media="x"]')
            allStyleElems.forEach((elem) => {
                elem.removeAttribute('media')
            })
        }
        tempFix()
    }

    Router.events.on('routeChangeComplete', routeChange)
    Router.events.on('routeChangeStart', routeChange)

    useEffect(() => {
        // Check for the root path ('/') on initial server-side render
        if (router.asPath === '/') {
            router.push('/Academy/Home') // Redirect to /Home on server-side (prevents client-side loop)
        }
    }, [])

    return (
        <RecoilRoot>
            <PageWrapper>
                <Component {...pageProps} />
                <SpeedInsights />
                <Analytics />
            </PageWrapper>
        </RecoilRoot>
    )
}
