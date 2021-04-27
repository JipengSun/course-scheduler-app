import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAXHWl5sPCzsNBSeTco_ZZ5x2vzytBx2Wc",
    authDomain: "coursescheduler-faaa2.firebaseapp.com",
    databaseURL: "https://coursescheduler-faaa2-default-rtdb.firebaseio.com",
    projectId: "coursescheduler-faaa2",
    storageBucket: "coursescheduler-faaa2.appspot.com",
    messagingSenderId: "751974336378",
    appId: "1:751974336378:web:3566a3370d6786d503f8c3",
    measurementId: "G-99BTQQWGCY"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    }
  else {
    firebase.app(); // if already initialized, use that one
  }

export default firebase;