//'use client'
import CallWrapper from "@/components/CallWrapper";
import SubscribePopup from './OneSignalSubscribePopupWrap';
import { Suspense } from 'react'
import { sendPushCall } from './lib';

//export default function Page({ user, channel }) 
export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ user: string, channel: string }>
}) {
    const { channel, user } = await searchParams;
    console.log("channel Name: ", channel, "user Name:", user);


    const push = await sendPushCall(channel, user);

    return (
        <div className="flex w-full flex-col">

            <Suspense fallback={<>...</>}>
                <SubscribePopup user={user} channel={channel} />
                <CallWrapper channelName={channel} userName={user} />
            </Suspense>
        </div>
    )
}