import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCJ6cCjx4wGQjhZekjSDzuu6M1E5vxIv04",
    authDomain: "personaldatastorage-42789.firebaseapp.com",
    projectId: "personaldatastorage-42789",
    storageBucket: "personaldatastorage-42789.appspot.com",
    messagingSenderId: "292782918209",
    appId: "1:292782918209:web:a09dd313c8348bfded14c0",
    measurementId: "G-Z8HG26N0DB"
};

if (typeof window !== 'undefined') {
    const app = initializeApp(firebaseConfig);
    if ('measurementId' in firebaseConfig) {
        getAnalytics(app);
    }
}

export default firebaseConfig;
