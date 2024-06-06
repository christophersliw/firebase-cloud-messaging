



import {initializeApp} from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  const app = initializeApp(firebaseConfig);
  
  
  // Initialize Firebase Cloud Messaging and get a reference to the service
  const messaging = getMessaging(app);
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...
  });

  function sendTokenToServer(token) {

console.log('Token:', token);


    fetch('https://localhost:7152/firebase-cloud-msg/register-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Token sent to server successfully:', data.message);
      } else {
        console.error('Error sending token to server:', data.message);
      }
    })
    .catch(error => {
      console.error('An error occurred while sending token to server:', error);
    });
  }
  

function requestPermission() {
    console.log('Requesting permission...');



    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');

          getToken(messaging, {vapidKey: "BOkR2mn44TJcuxelBLll47_VnqY9EaaL_62fwDVtqrUeLmNJdcFyPy7xgy1QautqKuTc90KmsfxtazL6B3eIX3U"}).then((currentToken) => {
            if (currentToken) {
                console.log('Registration token available', currentToken);

                sendTokenToServer(currentToken);

            } else {
              // Show permission request UI
              console.log('No registration token available. Request permission to generate one.');
              // ...
            }
          }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // ...
          });
            
        } else if (permission === 'denied') {
            console.log('Notification permission denied.');
        } else {
            console.log('Notification permission dismissed.');
        }
    }).catch((error) => {
        console.error('Error requesting notification permission:', error);
    });
    
}

window.requestPermission = requestPermission;
  

console.log('Firebase cloud-messaging!!!! :) !!!!!');



