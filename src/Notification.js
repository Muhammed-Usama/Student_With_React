import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
   apiKey: "AIzaSyB_shjsip8F0SURJDD3VtY3awcV_RDEOGI",
  authDomain: "send-notification-1c643.firebaseapp.com",
  projectId: "send-notification-1c643",
  storageBucket: "send-notification-1c643.appspot.com",
  messagingSenderId: "591484419480",
  appId: "1:591484419480:web:f488a84a9b2d4727993fed",
  measurementId: "G-4J1H04PCD6"
};


const fapp = initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = getMessaging(fapp);

const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BC9iircvayP_GIIUbi_uOosmCPWTgWv-L_Bg8SacS0WdIV6YCSIXVHoZXKy1oVhmbOv2y2Ezj-mmoq6i0oJoinw' });
                if (token) {
                    console.log('Token generated:', token);
                    // Send this token to your server to store it for later use
                } else {
                    console.log('No registration token available.');
                }
            } catch (err) {
                console.error('Error getting token:', err);
            }
        };

function Notification() {
   useEffect(() => {
        
        requestPermission();
    }, []);

    return <div>Notification Setup 🚀</div>;
}

export default Notification;
