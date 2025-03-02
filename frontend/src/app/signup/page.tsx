"use client";
import React, { useState } from "react";
import Link from "next/link";

// Utils
import { ValidateSignUp, AuthFieldErrors } from "../utils/ValidateAuthFields";

// API
import { SignUpAPI } from "../api/authAPI";
import { AxiosResponse } from "axios";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<AuthFieldErrors[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>(false);
  const [fetchingError, setFetchingError] = useState<string>("");

  const Signup = async (): Promise<void> => {
    try {
      const errors = ValidateSignUp(name, email, password);
      if(errors) {
        setErrors(errors);
      } else {
        setErrors(null);
        setIsLoading(true);
        const response = await SignUpAPI(name, email, password);
        if(response?.data.ok) {
          setIsSignedUp(true);
          setIsLoading(false);
          setErrors(null);
          return;
        }

        setIsLoading(false);
        setFetchingError(response?.data.message);
      }

    } catch (error) {
      if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
        console.log(error);
        return;
      }
      console.warn("Something went wrong while signing up");
    }
  };

  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center bg-white select-none">
      {!isSignedUp &&
        <div className="w-[28vw] h-fit px-4 pt-2 pb-3 bg-white border border-[#4e4e4e46] rounded-lg shadow-md flex flex-col items-start justify-start gap-2">

          <span className="text-2xl">Sign Up</span>
          {fetchingError && <span className="text-sm text-red-500 font-medium mx-auto">{fetchingError}</span>}

          <div className="w-full h-fit flex flex-col gap-2">
            <input
              type="text"
              placeholder="Name"
              className="w-full outline-none py-1 px-2 text-lg bg-white border border-[#4e4e4e46] rounded-lg shadow-md"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />

            {/* Error message */}
            {
              <span className="text-sm text-red-500 font-medium">
                {errors?.find((error) => error.field === "name")?.errorMsg}
              </span>
            }

            <input
              type="text"
              placeholder="Email"
              className="w-full outline-none py-1 px-2 text-lg bg-white border border-[#4e4e4e46] rounded-lg shadow-md"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
            />

            {/* Error message */}
            {
              <span className="text-sm text-red-500 font-medium">
                {errors?.find((error) => error.field === "email")?.errorMsg}
              </span>
            }

            <div className="w-full h-fit flex items-center justify-end">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full outline-none py-1 px-2 text-lg bg-white border border-[#4e4e4e46] rounded-lg shadow-md"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
              <span
                className="text-sm absolute mr-3 cursor-pointer select-none hover:font-medium transition-all duration-200"
                onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {/* Error message */}
            {
              <span className="text-sm text-red-500 font-medium">
                {errors?.find((error) => error.field === "password")?.errorMsg}
              </span>
            }

            <button
              className={`bg-black text-white py-2 px-2 text-md rounded-lg shadow-md cursor-pointer hover:bg-gray-900 transition-all duration-200 ${
                isLoading ? "opacity-90 cursor-not-allowed" : ""
              }`}
              onClick={Signup}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>

          <span className="mx-auto select-none text-lg">OR</span>

          <div className="w-full h-fit flex flex-col items-center justify-center gap-2">
            <button className="w-full py-1 px-2 text-md bg-white border border-[#4e4e4e46] rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200">
              Continue with Google
            </button>

            <button className="w-full py-1 px-2 text-md bg-white border border-[#4e4e4e46] rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200">
              Continue with GitHub
            </button>
          </div>

          <span className="mx-auto select-none text-lg">OR</span>

          <div className="w-full h-fit flex flex-col items-center justify-center gap-2 select-none">
            <span className="text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-500 hover:underline transition-all duration-200"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      }

      {isSignedUp &&
        <div className="w-[50vw] h-fit px-4 py-12 bg-white border border-[#4e4e4e46] rounded-lg shadow-sm flex flex-col items-center justify-start gap-4">
          <span className="text-2xl">Signed Up Successfully</span>
          <p className="text-lg font-medium text-center">We have sent you a verification email for email verification. Check your email for verification</p>
          <Link href={'/login'} className="bg-black text-white py-2 px-14 text-md rounded-lg shadow-md cursor-pointer hover:bg-gray-900 transition-all duration-200">
            Login
          </Link>
        </div>
      }
    </section>
  );
};

export default SignupPage;
