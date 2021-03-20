import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBhCfTYkoeHa27AqEneWEV0WeD5UIpjaVk",
    authDomain: "convin-test.firebaseapp.com",
    databaseURL: "https://convin-test-default-rtdb.firebaseio.com",
    projectId: "convin-test",
    storageBucket: "convin-test.appspot.com",
    messagingSenderId: "985688276832",
    appId: "1:985688276832:web:51d4edfc4d9cefc9eb6805"
};

const fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();