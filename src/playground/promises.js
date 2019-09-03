const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("this is my resolved data");
    reject("Something went wrong!");
  }, 5000);
});
 
console.log("before");

promise
  .then(data => {
    //registering a callback when the promise is resolved
    console.log("1", data);
    return new Promise((resolve, reject) => { //returning a promise withing a promise
      setTimeout(() => {
        resolve("this is my other promise");
      }, 1500);
    });
  }).then((str) => { //doesn't get data passed to it, unless up aboce returns something
    console.log("does this run?", str) //promise chaining //will only run if the promise before is resolved
  })
  .catch(error => {
    console.log("error: ", error);
  });

//ANOTHER WAY OF DOING A CATCH HANDLER- having a second argument into "then";
//Not a preferred/clear version
/*promise.then(
  data => {
    console.log("2", data);
  },
  error => {
    console.log("error: ", error);
  } 
);*/

console.log("after");
