import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.analytics();
firebase.firestore().settings({timestampsInSnapshots: true})

const Firebase = {
  // auth
  auth: () => {
    return firebase
      .auth()
  },
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  // firestore
  sendRequest: (userId) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .set({
        requestSent: true
      }, {merge: true})
  },
  addUser: user => {
    return firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .set({
        id: user.id,
        name: user.name,
        email: user.email,
      })
  },
  getUsers: () => {
    return firebase
      .firestore()
      .collection('users')
      .get()
  },
  addMapPoint: (userId, point) => {
    return firebase
      .firestore()
      .collection('map-data')
      .add({
        userId: userId,
        latlong: new firebase.firestore.GeoPoint(point.lat, point.lon)
      })
  },
  db: () => {
    return firebase
      .firestore()
  }
}

export default Firebase
