//'use client'
import CallWrapper from "@/components/CallWrapper";
import SubscribePopup from './OneSignalSubscribePopup';
import { use } from 'react'
import { Suspense } from 'react'

export default async function Page({ user, channel }) 
/*export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ userName: string, channelName: string }>
})*/ {
    //const { channelName, userName } = await searchParams;
    console.log("channel Name: ", channel, "user Name:", use);

    return (
        <div className="flex w-full flex-col">

            <Suspense fallback={<>...</>}>
                <SubscribePopup user={user} channel={channel} />
                <CallWrapper channelName={channel} />
            </Suspense>
        </div>
    )
}