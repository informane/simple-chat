import CallWrapper from "@/components/CallWrapper";
import { use } from 'react'
import { Suspense } from 'react'

interface PageProps {
    searchParams: { channelName: string };
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ channel: string }>
}) { 
    const { channel } = await searchParams;
    console.log("channel Name: ", channel); 

    return (
        <div className="flex w-full flex-col">
            <Suspense fallback={<>...</>}>
                <CallWrapper channelName={channel} />
            </Suspense>
        </div>
    )
}