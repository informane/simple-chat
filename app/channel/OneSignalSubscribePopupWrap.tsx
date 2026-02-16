'use client'
import dynamic from 'next/dynamic';

// This component will only be loaded and rendered on the client
const OneSignalSubscribePopupWrap = dynamic(
  () => import('./OneSignalSubscribePopup'),
  { ssr: false }
);

export default function SubscribePopup({ user, channel }) {
  return <OneSignalSubscribePopupWrap  user={user} channel={channel} />;
}