import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {
    const followingList = [{nickname: 'test1'}, {nickname: 'test2'}, {nickname: 'test3'}]
    const followerList = [{nickname: 'test1'}, {nickname: 'test2'}, {nickname: 'test3'}]
    return (
        <>
            <Head>
                <title>Profile | SNS</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="Following List" data={followingList} />
                <FollowList header="Follwer List" data={followerList} />
            </AppLayout>
        </>
    )
}

export default Profile
