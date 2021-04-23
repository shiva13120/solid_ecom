import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import {
  createUserWithEmailAndPassword,
  handleFbSignIn,
  handleGoogleSignIn,
  handleSignOut,
  initializeLoginFramework,
  resetPassword,
  signInWithEmailAndPassword,
} from "./LoginManager";

function Login() {
  const [newUser, setNewUSer] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
    error: "",
    success: false,
  });

  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn().then((res) => {
      handleResponse(res, true)
    });
  };

  const fbSignIn = () => {
    handleFbSignIn().then((res) => {
      handleResponse(res, true)
    });
  };

  const signOut = () => {
    handleSignOut().then((res) => {
      handleResponse(res, false)
    });
  };

  const handleResponse =(res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordsValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFormValid = isPasswordsValid && passwordHasNumber;
    }
    if (isFormValid) {
      /// [...cart, newItem]
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    //console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true)
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true)
      });
    }
    e.preventDefault();
  };

  return (
    <div style={{ textAlign: "center" }}>
      {user.isSignedIn ? (
        <button onClick={signOut}> Sign out</button>
      ) : (
        <button onClick={googleSignIn}> Sign in</button>
      )}
      <br />

      <button onClick={fbSignIn}>Sign in using Facebook</button>

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      )}

      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewUSer(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onClick={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            onBlur={handleBlur}
            placeholder="Your name"
            required
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your Email Address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : "Sign in"} />
      </form>
      <button onClick={()=>resetPassword(user.email)}>Forget or reset Password</button>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          User {newUser ? "created" : "Logged in"} successfully
        </p>
      )}
    </div>
  );
}

export default Login;
