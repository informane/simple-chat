'use server'
import axios from 'axios';

export async function sendPushCall(channel, user) {
    try {
        var oneSignalAppId = process.env.ONESIGNAL_APP_ID;
        var oneSignalApiKey = process.env.ONESIGNAL_REST_API_KEY;

        await axios.post('https://api.onesignal.com/notifications', {
            app_id: oneSignalAppId,
            //target_channel: "push",
            filters: [
                {
                    "field": "tag",
                    "relation": "=",
                    //"key": "category",
                    "value": channel
                },
                /*{
                    "operator": "AND" // Ensures BOTH conditions must be met
                },
                {
                    "field": "tag",
                    "relation": "not_exists",
                    //"key": "category",
                    "value": 'user_' + user
                },*/
            ],
            data: {
                user: user,
                channel: channel
            },
            contents: {
                en: user + " вошел на канал " + channel,
            },
            url: "https://simple-chat-mu-sand.vercel.app/channel?user=" + user + "&channel=" + channel
        }, {
            headers: {
                'Authorization': `Key ${oneSignalApiKey}`,
                'Content-Type': 'application/json'
            }
        });

        return { success: true, message: 'Call Notification sent' };

    } catch (error) {
        console.error("Error sending notification:", error.response?.data || error.message);
        return { success: false, message: error.response?.data };
    }
}
