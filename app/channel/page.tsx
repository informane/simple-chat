import CallWrapper from "@/components/CallWrapper";
import SubscribePopup from './OneSignalSubscribePopup';
import { use } from 'react'
import { Suspense } from 'react'


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ userName: string, channelName: string }>
}) {
    const { channelName, userName } = await searchParams;
    console.log("channel Name: ", channelName, "user Name:", userName);

    return (
        <div className="flex w-full flex-col">

            <Suspense fallback={<>...</>}>
                <SubscribePopup userName={userName} channelName={channelName} />
                <CallWrapper channelName={channelName} />
            </Suspense>
        </div>
    )
}