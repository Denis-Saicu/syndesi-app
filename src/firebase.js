import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBchzhwm-9ANlurCmrvcONUSkV-Yo9zz0o",
    authDomain: "syndesi-app.firebaseapp.com",
    projectId: "syndesi-app",
    storageBucket: "syndesi-app.appspot.com",
    messagingSenderId: "510416101827",
    appId: "1:510416101827:web:692339b3e5e1a145d79d76"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;