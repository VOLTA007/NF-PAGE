import React from 'react'
import Userwelcome from '@/Components/Userwelcome'


export default function Home() {
    return (
        <>
            <Userwelcome />
            <div
                className="h-screen"
                style={{ height: 'calc(100vh - 590px)' }}
            ></div>
        </>
    )
}
