import { redirect } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    await signInWithPopup(getAuth(), provider);
  } catch (err) {
    return redirect("/");
  }
  return redirect("/storage");
};

export default googleSignIn;
