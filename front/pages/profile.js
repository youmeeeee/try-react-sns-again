import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { me } = useSelector(state => state.user)
    return (
        <>
            <Head>
                <title>Profile | SNS</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="Following" data={me.Following} />
                <FollowList header="Follower" data={me.Followers} />
            </AppLayout>
        </>
    )
}

export default Profile
