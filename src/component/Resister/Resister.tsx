import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
  User,
} from "firebase/auth";
import app from "@/firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

interface RegisterState {
  error: string;
  success: string;
}

const Register: React.FC = () => {
  const [state, setState] = useState<RegisterState>({ error: "", success: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ error: "", success: "" });

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;

    // Validate password
    if (!/(?=.*[A-Z])/.test(password)) {
      setState({ ...state, error: "Please add at least one uppercase letter" });
      return;
    } else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setState({ ...state, error: "Please add at least two numbers" });
      return;
    } else if (password.length < 6) {
      setState({
        ...state,
        error: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      await sendVerificationEmail(user);
      await updateUserData(user, name);

      setState({ error: "", success: "User has been created successfully" });
      form.reset();
    } catch (error: any) {
      console.error(error.message);
      setState({ ...state, error: error.message });
    }
  };

  const sendVerificationEmail = async (user: User) => {
    try {
      await sendEmailVerification(user);
      alert("Please verify your email address. Check your inbox.");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const updateUserData = async (user: User, name: string) => {
    try {
      await updateProfile(user, {
        displayName: name,
      });
      console.log("User name updated");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Please Register
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Your Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Your Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register Now
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Login
          </Link>
        </div>

        {state.error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{state.error}</div>
          </div>
        )}

        {state.success && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{state.success}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
