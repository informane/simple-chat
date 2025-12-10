'use client'
import { useEffect, useState } from "react";
import Call from "@/components/Call";

export default function CallWrapper({ channelName }: { channelName: string }) {

    const [rtcData, setRtcData] = useState({ channelName: channelName, appId: process.env.NEXT_PUBLIC_AGORA_APP_ID!, rtcToken: '', numericUid: 0 })

    useEffect(() => {

        const init = async () => {

            const response = await fetch(`/api/token?channelName=${encodeURIComponent(rtcData.channelName)}`);
            const data = await response.json();
            if (!data.rtcToken) {
                console.error("Token fetch failed or token is empty.");
                return;
            } else {
                setRtcData(data);
            }

        }
        if (rtcData.numericUid == 0 || !rtcData.rtcToken || !rtcData.channelName || !rtcData.appId) {
            init();
        }

    }, [rtcData]);

    if (rtcData.numericUid == 0 || !rtcData.rtcToken || !rtcData.channelName || !rtcData.appId)
        return (<div>загрузка...</div>)
    else

        return (
            <>
                <div>{rtcData.channelName}</div>
                <Call channelName={rtcData.channelName} appId={rtcData.appId} rtcToken={rtcData.rtcToken} numericUid={rtcData.numericUid} />
            </>
        );
}
