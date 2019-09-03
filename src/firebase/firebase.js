import * as firebase from "firebase"; //all named exports and putting them under the variable name firebase

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSENGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };

// //child removed
// database.ref("expenses").on("child_removed", snapshot=>{
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_changed", snapshot=>{
//     console.log(snapshot.key, snapshot.val());
// });

// database.ref("expenses").on("child_added", snapshot=>{
//     console.log(snapshot.key, snapshot.val());
// });

// database
//   .ref("expenses")
//   .once("value")
//   .then(snapshot => {
//     const expenses = [];

//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val
//       });
//     });

//     console.log(expenses);
//   });

// database.ref("expenses").on(
//   "value",
//   snapshot => {
//     const expenses = [];
//     snapshot.forEach(childSnapshot => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val
//       });
//     });
//     console.log(expenses);
//   },
//   e => {
//     console.log("Error when fetching onJobFetch", e);
//   }
// );

// database.ref("expenses").push({
//     description: "grocery shopping",
//     note: "weekly shop",
//     amount: "87.60",
//     createdAt: "date"
// });
