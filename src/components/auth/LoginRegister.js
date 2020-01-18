import React, { useState } from "react";
import { InputForm } from "../general/InputForm";
import * as firebase from "firebase/app";

const OptionsForm = ({ showLogin, showRegister }) => {
  return (
    <div>
      <button onClick={showLogin}>Login</button>
      <button onClick={showRegister}>Register</button>
    </div>
  );
};

const LoginForm = ({ showRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = e => setEmail(e.target.value);
  const changePassword = e => setPassword(e.target.value);

  const handleLogin = e => {
    e.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form>
        <InputForm
          labelhead={"Email"}
          value={email}
          onChange={changeEmail}
          type={"email"}
          placeholder={"Enter your email address"}
        />
        <InputForm
          labelhead={"Password"}
          value={password}
          onChange={changePassword}
          type={"password"}
          placeholder={"Enter your password"}
        />
        <button onClick={handleLogin}>Login</button>
        <button onClick={showRegister}>Register an account</button>
      </form>
    </div>
  );
};

const RegisterForm = ({ showLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = e => setEmail(e.target.value);
  const changePassword = e => setPassword(e.target.value);

  const handleSignup = e => {
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <form>
        <InputForm
          labelhead={"Email"}
          value={email}
          onChange={changeEmail}
          type={"email"}
          placeholder={"Enter your email address"}
        />
        <InputForm
          labelhead={"Password"}
          value={password}
          onChange={changePassword}
          type={"password"}
          placeholder={"Enter your password"}
        />
        <button onClick={handleSignup}>Register</button>
        <button onClick={showLogin}>Already have an account?</button>
      </form>
    </div>
  );
};

// const styles = {
//   wrapper: {
//     position: "absolute",
//     top: "50%",
//     msTransform: "translate(-50%)",
//     transform: "translateY(-50%)",
//     left: "25%"
//   }
// };

export { LoginForm, RegisterForm, OptionsForm };
