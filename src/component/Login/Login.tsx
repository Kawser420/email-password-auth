import React, { useRef, useState } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "@/firebase/firebase.config";
import { Link } from "react-router-dom";

const auth = getAuth(app);

interface LoginState {
  error: string;
  success: string;
}

const Login: React.FC = () => {
  const [state, setState] = useState<LoginState>({ error: "", success: "" });
  const emailRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    // Validation
    setState({ error: "", success: "" });

    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setState({
        ...state,
        error: "Please use at least two uppercase characters. ex: AB",
      });
      return;
    } else if (!/(?=.*[!@#$&*])/.test(password)) {
      setState({
        ...state,
        error: "Please include one of these special characters: !@#$&*",
      });
      return;
    } else if (password.length < 6) {
      setState({
        ...state,
        error: "Password must be at least 6 characters long",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      setState({ error: "", success: "Login successfully" });
    } catch (error: any) {
      console.error(error.message);
      setState({ ...state, error: error.message });
    }
  };

  const handleResetPassword = async () => {
    const email = emailRef.current?.value;
    if (!email) {
      alert("Please provide your email address to reset password");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Please check your email for reset instructions");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>

        <div className="text-sm text-center">
          <button
            onClick={handleResetPassword}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Forgot your password?
          </button>
        </div>

        <div className="text-sm text-center">
          <span className="text-gray-600">New to website? </span>
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
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

        <div className="flex items-center">
          <input
            id="terms-checkbox"
            name="terms-checkbox"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="terms-checkbox"
            className="ml-2 block text-sm text-gray-900"
          >
            I agree to the terms and conditions
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
