import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { Container, Form, FormControl, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Alert } from "@mui/material";
import { ColorButton } from "../components/Styled";

const LoginForm = () => {
// the useForm hook is used to initialize form functionality. 
// It provides methods and properties like register, handleSubmit, setError, 
// formState helps with form validation and handling form submission.
  const { register, handleSubmit, setError, formState: { errors }} = useForm();
  // eslint-disable-next-line 
  const [isLoading, setIsLoading] = useState(false);
  // The useNavigate hook is used to obtain a navigation function, which will be used to redirect the user after a successful login.
  const navigate = useNavigate();

  const onSubmit = ({ email, password }) => {
    setIsLoading(true);
    // The 'signInWithEmailAndPassword' method from the Firebase authentication library is used to authenticate the user with the provided email and password.
    // If the authentication is successful, the user is logged in, and the navigate function is called to redirect them to the home page.
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged in:", email);
        setIsLoading(true);
        navigate("/");
      })
      .catch((error) => {
        // If user is not found, the setError function is called to set an error message for the email field. 
        if (error.code === "auth/user-not-found") {
          setError("email", {
            type: "manual",
            message: "User with this email address does not exist.",
          });
        // If the user gives a wrong password, the setError function is called to set an error message for the password field.
        } else if (error.code === "auth/wrong-password") {
            setError("password", { type: "manual", message: "Wrong password" });
        } else {
            console.error(error);
        }
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column container-fluid vh-100">
      <h2 className="mb-3">Sign in</h2>
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
          <div className="d-flex justify-content-center align-items-center">
            <ColorButton className="mt-3 mb-3 w-100" type="submit">Log in</ColorButton>
          </div>
        </Form>
        <div className="link text-center">
          <Link to="/signup" className="link-dark">Don't have an account yet? Sign up.</Link>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
