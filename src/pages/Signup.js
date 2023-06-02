import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, FormControl, FormLabel } from "react-bootstrap";
import firebase from "../Firebase";
import { Alert } from "@mui/material";
import { ColorButton } from "../components/Styled";

const RegistrationForm = () => {
  const {register, handleSubmit, setError, watch, formState: { errors }} = useForm();

  // A password ref is created using the useRef hook to watch the value of the "password" field for password confirmation.
  const password = useRef({});
  password.current = watch("password", "");

  // onSubmit function is called when the form is submitted. 
  const onSubmit = async ({ email, password }) => {
    // Firebase's authentication methods are used to create a new user with the provided email and password.
    // If the user creation is successful, the user's email is logged, and an email verification link is sent to the user.
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log("New user:", email);

      await user.sendEmailVerification();
      console.log("Verification email sent");
      
      // If the error is due to the email already being in use, an error message is set for the "email" field using the setError function.
      } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "manual",
          message: "This email address is already in use.",
        });
        console.log(email, "already in use");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column container-fluid vh-100">
      <h2 className="pb-4">Sign Up</h2>
      <div className="col-md-3 mb-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel htmlFor="email">Email</FormLabel>
        <FormControl
        className="mb-2"
          type="email"
          id="email"
          {...register("email", { required: "Email is required" })}
        />
        <div className="error">
          {errors.email && (
            <Alert className="mb-2" severity="error">
              {errors.email.message}
            </Alert>
          )}
        </div>
        <FormLabel htmlFor="password">Password</FormLabel>
        <FormControl
        className="mb-2"
          type="password"
          id="password"
          {...register("password", { required: "Password is required" })}
        />
        <div className="error">
          {errors.password && (
            <Alert className="mb-2" severity="error">
              {errors.password.message}
            </Alert>
          )}
        </div>
        <FormLabel htmlFor="confirmPassword">Confirm password</FormLabel>
        <FormControl
        className="mb-2"
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password.",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        <div className="error">
          {errors.confirmPassword && (
            <Alert className="mb-2" severity="error">
              {errors.confirmPassword.message}
            </Alert>
          )}
        </div>
        <ColorButton className="mt-3 w-100" type="submit">
          Register
        </ColorButton>
      </Form>
      </div>
    </Container>
  );
};

export default RegistrationForm;
