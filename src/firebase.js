import firebase from "firebase/app"
import "firebase/firebase-firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDWgNlsfZOyE9U0uE9ZTGnN5aI0gre8k3s",
  authDomain: "todo-app-fdc89.firebaseapp.com",
  projectId: "todo-app-fdc89",
  storageBucket: "todo-app-fdc89.appspot.com",
  messagingSenderId: "133657676063",
  appId: "1:133657676063:web:d97c9d98c499f340ac482a",
  measurementId: "G-EJ0KVEWCWT",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

export { firebaseApp as default, db }
