import firebase from 'firebase'
import 'firebase/firestore'

const cfg = {
    apiKey: "AIzaSyCAm-qjkbGvRWIOn7ClfytW5jzRZXTjnno",
    authDomain: "dummy-thing-8cc00.firebaseapp.com",
    databaseURL: "https://dummy-thing-8cc00.firebaseio.com",
    projectId: "dummy-thing-8cc00",
    storageBucket: "dummy-thing-8cc00.appspot.com",
    messagingSenderId: "1023898207181",
    appId: "1:1023898207181:web:c8d18e3d9354357370ba84",
    measurementId: "G-ZZ4H1QCSK7"
};

firebase.initializeApp(cfg)

export const fetchData = async (collection) => {
    const snapshot = await firebase.firestore().collection(collection).get();
    return snapshot.docs.map(doc => ({
        id : doc.id,
        ...doc.data()
    }))
}




