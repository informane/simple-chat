'use client';
import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';
import dynamic from 'next/dynamic';

export default function SubscribePopup({ user, channel }/*:
  { user: string, channel: string }*/
) {

  const [userName, setUserName] = useState(user);
  const appId = "fe2e257e-4fa0-449a-a353-4f33b49336cb";
  const safari_web_id = "web.onesignal.auto.16bc3731-50fd-4ae0-bf69-b8ea0dbfb349";


  useEffect(() => {
    console.log(user, userName)
    if (!userName) return;

    const initializeOneSignal = async () => {
      try {
        //const OneSignal = (await import('react-onesignal')).default;


        await OneSignal.init({
          appId: appId,
          safari_web_id: safari_web_id,
          notificationClickHandlerMatch: 'exact',
          notificationClickHandlerAction: 'focus',
          welcomeNotification: {
            message: 'Теперь вы (' + user + ') подписаны на канал ' + channel
          },
          autoResubscribe: false,
          /*webhooks: {
            cors: false,
            'notification.willDisplay': 'https://chatter-psi-six.vercel.app/api/onesignal/shown',
            'notification.clicked': 'https://chatter-psi-six.vercel.app/api/onesignal/accepted',
            'notification.dismissed': 'https://chatter-psi-six.vercel.app/api/onesignal/rejected'
          },*/
          promptOptions: {
            slidedown: {
              prompts: [{
                type: 'push',
                autoPrompt: true,
                delay: { pageViews: 1, timeDelay: 3 },
                categories: [{
                  tag: channel,
                  label: channel
                },
                {
                  tag: 'user_' + user,
                  label: 'user_' + user,
                }
                ],
                text: {
                  actionMessage: "Оставайтесь в курсе всех кто заходит на канал " + channel,
                  acceptButton: "Подписаться",
                  //cancelButton: "Maybe Later"
                }
              }]
            }
          },
        });

        var subscribeUser = async (event) => {

          //if (isSubscribed) {
          //console.log('user subscribed success')
          const user_id = OneSignal.User.onesignalId;
          //setUserId(user_id);
          console.log('user_id: ', OneSignal.User.onesignalId);
          console.log('user_name: ', user);
          await OneSignal.login(user);
          console.log('login succecss', 'ext_id: ', OneSignal.User.externalId)
          //}
        }

        OneSignal.User.PushSubscription.addEventListener(
          'change',
          subscribeUser
        );

        console.log("OneSignal initialized successfully");
      } catch (err) {
        console.error("OneSignal init error:", err);
      }

    }

    if (typeof window !== "undefined") {
      initializeOneSignal();
    }


    /*return () => {
      OneSignal.User.PushSubscription.removeEventListener(
        'change',
        subscribeUser
      )
    };*/

  }, [])



  return null;
};
