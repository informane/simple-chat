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
            <p className="absolute z-10 mt-2 ml-12 text-2xl font-bold text-gray-900">
                {/*searchParams.channelName!*/}
            </p>
            <Suspense fallback={<>...</>}>
                <CallWrapper channelName={channel} />
            </Suspense>
        </div>
    )
}