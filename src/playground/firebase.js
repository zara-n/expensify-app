import * as firebase from "firebase"; //all named exports and putting them under the variable name firebase

const config = {
  apiKey: "AIzaSyDvB2Y53Z7sPbnA8nLJHIDBzeB0JjBkOiE",
  authDomain: "expensify-3e7cc.firebaseapp.com",
  databaseURL: "https://expensify-3e7cc.firebaseio.com",
  projectId: "expensify-3e7cc",
  storageBucket: "expensify-3e7cc.appspot.com",
  messagingSenderId: "236142290934",
  appId: "1:236142290934:web:2ee9965b02c89b6b"
};

firebase.initializeApp(config);

const database = firebase.database();

database.ref("notes/-LiItHOPavs11AJKLWe3").remove();

database.ref("notes").push({
    title: "Course Topics",
    body: "React Native, Angular, Python"
})



const onJobFetch = database.ref("Person").on(
  "value",
  snapshot => {
    const value = snapshot.val();
    console.log(`${value.name} is a ${value.job.title} at ${value.job.company}`);
  },
  e => {
    console.log("Error when fetching onJobFetch", e);
  }
);

setTimeout(() => {
  database
    .ref("Person")
    .update({
      "job/title": "Manager"
    })
    .then(() => {})
    .catch(e => {
      console.log("Error updated job title", e);
    });
}, 5000);

const onValueChange = database.ref("Person").on("value", snapshot => {
  //callback done on any update to database, with call ".on("value", snapshot)"
  //subscribes to the database
  console.log(snapshot.val());
  console.log("updated");
}, (e) => {
    console.log("Error when data fetching ", e);
});

setTimeout(() => {
  database.ref("Person/age").set(26);
}, 3500);

setTimeout(() => {
  database.ref("Person").off(onValueChange); //cancels subscription
}, 7000);

setTimeout(() => {
  database.ref("Person/age").set(27);
}, 10500);

database
  .ref("Person")
  .once("value")
  .then(snapshot => {
    const val = snapshot.val();
    console.log(val);
  })
  .catch(e => {
    console.log("Error fetching data: ", e);
  });

database
  .ref("Person")
  .set({
    name: "Zara Kod",
    age: 25,
    stressLevel: 6,
    job: {
      title: "Software developer",
      company: "Google"
    },
    location: {
      city: "Dallas",
      country: "United States"
    }
  })
  .then(() => {
    console.log("Data is saved");
  })
  .catch(e => {
    console.log("Data save failed: ", e);
  });

database
  .ref("Person/attributes")
  .set({
    height: "176cm",
    weight: "none of your business"
  })
  .then(() => {
    console.log("Second set call success");
  })
  .catch(e => {
    console.log("Things didn't work for the second error: ", e);
  });

  database.ref("Person").update({
      stressLevel: 9,
      "job/company": "Amazon",
      "location/city": "Seattle"
  });

database.ref("Person").update({ //updates ONLY at root level, other data within object will be deleted accordingly
  job: "Manager",
  "location/city": "Yorkshire" //only way to work around around updates's root level call
});

  database.ref("Person").update({
    name: "Mike", //modifying current data
    age: 29,
    job: "Software Developer", //adding new
    isSingle: null //deleting
  });

database
  .ref("")
  .remove()
  .then(() => {
    console.log("data removed successfully");
  })
  .catch(e => {
    console.log("delete data failed: ", e);
  });

database
  .ref("Person/isSingle")
  .set(null)
  .then(() => {
    console.log("data deleted successfully");
  })
  .catch(e => {
    console.log("delete data failed: ", e);
  });
