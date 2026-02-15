'use client';
import { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';

export default function SubscribePopup({ userName, channelName }:
  { userName: string, channelName: string }
) {

  const [userId, setUserId] = useState(null);
  const appId = "fe2e257e-4fa0-449a-a353-4f33b49336cb";
  const safari_web_id = "web.onesignal.auto.16bc3731-50fd-4ae0-bf69-b8ea0dbfb349";


  useEffect(() => {
    const initializeOneSignal = async () => {

      await OneSignal.init({
        appId: appId,
        safari_web_id: safari_web_id,
        notificationClickHandlerMatch: 'exact',
        notificationClickHandlerAction: 'focus',
        welcomeNotification: {
          message: 'Теперь вы (' + userName + ') подписаны на канал ' + channelName
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
                tag: "call",
                label: "Пользователь вошел на канал"
              }],
              text: {
                actionMessage: "Оставайтесь в курсе всех кто заходит на этот канал",
                acceptButton: "Подписаться",
                //cancelButton: "Maybe Later"
              }
            }]
          }
        },
      });

      OneSignal.User.PushSubscription.addEventListener(
        'change',
        subscribeUser
      );

    }
    initializeOneSignal();

    return () => {
      OneSignal.User.PushSubscription.removeEventListener(
        'change',
        subscribeUser
      );
    };

  }, []);

  const subscribeUser = async (isSubscribed) => {

    if (isSubscribed) {
      console.log('user subscribed success')
      const user_id = OneSignal.User.onesignalId;
      setUserId(user_id);

      if (user_id) {
        OneSignal.login(userName);
      }
      
      return () => {
        OneSignal.User.PushSubscription.removeEventListener(
          'change',
          subscribeUser
        );
      };
    }
  }
  return null;
};
