import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDje9lNZ_msaeo0Aj7tKEoA7S6y7m_80i4",
    authDomain: "revents-237521.firebaseapp.com",
    databaseURL: "https://revents-237521.firebaseio.com",
    projectId: "revents-237521",
    storageBucket: "revents-237521.appspot.com",
    messagingSenderId: "417881571086"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);

export default firebase;