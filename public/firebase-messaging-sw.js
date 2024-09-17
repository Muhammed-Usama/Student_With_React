
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');


const firebaseConfig = {
  apiKey: "AIzaSyB_shjsip8F0SURJDD3VtY3awcV_RDEOGI",
  authDomain: "send-notification-1c643.firebaseapp.com",
  projectId: "send-notification-1c643",
  storageBucket: "send-notification-1c643.appspot.com",
  messagingSenderId: "591484419480",
  appId: "1:591484419480:web:f488a84a9b2d4727993fed",
  measurementId: "G-4J1H04PCD6"

};



firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});