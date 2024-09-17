import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
const messaging = getMessaging(fapp);

const App = () => {
 const [token, setToken] = useState('');

const requestPermission = async () => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: 'BC9iircvayP_GIIUbi_uOosmCPWTgWv-L_Bg8SacS0WdIV6YCSIXVHoZXKy1oVhmbOv2y2Ezj-mmoq6i0oJoinw' });
    if (currentToken) {
      console.log('Token generated:', currentToken);
      setToken(currentToken);
      send(currentToken);
    } else {
      console.log('No registration token available.');
    }
  } catch (err) {
    console.error('Error getting token:', err);
  }
};

const send = (currentToken) => {
  axios.post('http://127.0.0.1:8000/api/savedevicetoken', { token: currentToken })
    .then(response => {
      console.log('Token saved successfully!');
    })
    .catch(error => {
      console.error('Error saving token:', error);
    });
};

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div className="App">
      {/* Your UI components here */}
    </div>
  );
}

export default App;
