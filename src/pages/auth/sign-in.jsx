import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import supabase from "./supabaseClient";
import { useState, useRef } from "react";

import Cookies from "js-cookie";
export function SignIn() {
  // Initializing formData state with email and password fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // use ref to input demo email and password fields at the correct fields
  const emailRef = useRef();
  const passwordRef = useRef();

  const demoEmail = import.meta.env.VITE_DEMO_LOGIN_EMAIL;
  const demoPassword = import.meta.env.VITE_DEMO_LOGIN_PASS;

  // Function to handle sign in when form is submitted
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Using supabase to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      console.error(data, error);
      Cookies.set("token", data.session.access_token);
      Cookies.set("uid", data.user.id);
      Cookies.set("email", data.user.email);
      Cookies.set("name", data.user.user_metadata.Name);
      if (Cookies.get("token")) {
        window.location.href = "/dashboard/home";
      }
    } catch (error) {
      alert("Wrong Email or Password!");
    }
  };
  // Function to handle changes in form input fields
  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  // function to toggle password visibility
  const togglePassword = (e) => {
    const x = passwordRef.current.querySelector("input");
    console.log(x.type);
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 mt-10 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            {/* Sign In title */}
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            {/* Email input field */}
            <Input
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
              size="lg"
              ref={emailRef}
            />
            {/* Password input field */}
            <Input
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              size="lg"
              ref={passwordRef}
            />
            {/* Toggle password visibility checkbox */}
            <div className="-ml-2.5">
              <Checkbox label="Show password" onChange={togglePassword} />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            {/* Sign In button */}
            <Button variant="gradient" fullWidth onClick={handleSignIn}>
              Sign In
            </Button>
            {/* Demo sign in button */}
            <Button
              variant="gradient"
              color="green"
              fullWidth
              className="mt-3"
              onClick={() => {
                // set the values in UI
                emailRef.current.querySelector("input").value = demoEmail;
                passwordRef.current.querySelector("input").value = demoPassword;

                // set value in formdata
                setFormData({
                  email: demoEmail,
                  password: demoPassword,
                });
              }}
            >
              Demo Sign In
            </Button>
            {/* Sign up link */}
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
