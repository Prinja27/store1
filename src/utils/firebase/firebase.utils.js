import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyAUqVRn7R1wzGhGn33j2FGCyWhCa5REfJo",
  authDomain: "ecom-db-c85c2.firebaseapp.com",
  projectId: "ecom-db-c85c2",
  storageBucket: "ecom-db-c85c2.appspot.com",
  messagingSenderId: "86471911681",
  appId: "1:86471911681:web:0101810cd1d7e413b0d300"
};

const firebaseAPP = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInwithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  const userSnapshot = await getDoc(userDocRef)

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef,{
        displayName,
        email,
        createdAt
      })
    }catch(error){
      console.log("error creating the user", error.message)
    }
  }
  return userDocRef
}