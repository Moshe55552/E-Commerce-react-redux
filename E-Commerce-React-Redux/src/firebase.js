import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpFhcNf-Hj24FCbQH7JitjpEsCPv2l_ng",
  authDomain: "e-commerce-react-redux-5b8a6.firebaseapp.com",
  projectId: "e-commerce-react-redux-5b8a6",
  storageBucket: "e-commerce-react-redux-5b8a6.appspot.com",
  messagingSenderId: "411275047419",
  appId: "1:411275047419:web:6054df16ebf0b277545b5e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to update sold count in Firebase
const updateProductSoldCountInFirebase = async (
  categoryId,
  productId,
  quantity
) => {
  try {
    const productRef = doc(db, "categories", categoryId, "products", productId);
    await updateDoc(productRef, { sold: increment(quantity) });
    console.log("Product sold count updated successfully.");
  } catch (error) {
    console.error("Error updating product sold count: ", error);
  }
};

export { auth, db, updateProductSoldCountInFirebase };
