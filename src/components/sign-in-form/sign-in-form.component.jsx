import { useState } from "react";

import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log("User sign-in encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required={true}
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required={true}
          onChange={handleChange}
          name="password"
          value={password}
        />{" "}
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>

          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Google Sign-in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
