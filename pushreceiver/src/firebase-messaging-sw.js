// Import and configure Firebase
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

console.log('Service Worker Loaded!');

const firebaseConfig = {
    apiKey: "AIzaSyDT0ULO9QFT-cHcRmHJ8bMtuLuZmbWKSq4",
    authDomain: "web-test-8baab.firebaseapp.com",
    projectId: "web-test-8baab",
    storageBucket: "web-test-8baab.appspot.com",
    messagingSenderId: "247792801033",
    appId: "1:247792801033:web:06b8fa3a6c46cb05586fd8",
    measurementId: "G-MQ3J3BPJZQ"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
