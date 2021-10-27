import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'

const Profile = () => {
    return (
        <>
            <Head>
                <title>Profile | SNS</title>
            </Head>
            <AppLayout>
                <div>
                    Profile
                </div>
            </AppLayout>
        </>
    )
}

export default Profile
