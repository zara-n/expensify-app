import { firebase, googleAuthProvider } from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid
})

export const startLogin = () => {
  //async action, returns a function
  return () => {
      return firebase.auth().signInWithPopup(googleAuthProvider); //takes provider as it's only argument 
  };
};

export const logout = () => ({
    type: "LOGOUT"
})

export const startLogout = () => {
    return () => { //redux thunk spec, by returning a function
        return firebase.auth().signOut();
    }
}