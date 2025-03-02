"use client";
import React, { useState } from "react";
import Link from "next/link";

// Utils
import { ValidateLogin, AuthFieldErrors } from "../utils/ValidateAuthFields";

// API
import { LoginAPI } from "../api/authAPI";
import { AxiosResponse } from "axios";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<AuthFieldErrors[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchingError, setFetchingError] = useState<string>("");

  const Login = async ():Promise<void> => {
    try {
        const errors = ValidateLogin(email, password);
        if(errors) {
            setErrors(errors);
        } else {
            setErrors(null);
            setIsLoading(true);

            const response:AxiosResponse | void = await LoginAPI(email, password);
            if(response?.data.ok) {
                setIsLoading(false);
                setErrors(null);
                return;
            }

            setIsLoading(false);
            setFetchingError(response?.data.message);
        }
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
      <section className="w-[100vw] h-[100vh] flex items-center justify-center bg-white select-none">
        <div className="w-[28vw] h-fit px-4 pt-2 pb-4 bg-white border border-[#4e4e4e46] rounded-lg shadow-md flex flex-col items-start justify-start gap-3">
          <span className="text-2xl">Login</span>
          {fetchingError && <span className="text-md text-red-500 font-medium mx-auto">{fetchingError}</span>}
          <div className="w-full h-fit flex flex-col gap-2">
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
            {<span className="text-sm text-red-500 font-medium">{errors?.find(error => error.field === "email")?.errorMsg}</span>}

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
            {<span className="text-sm text-red-500 font-medium">{errors?.find(error => error.field === "password")?.errorMsg}</span>}

            <button className={`bg-black text-white py-2 px-2 text-md rounded-lg shadow-md cursor-pointer hover:bg-gray-900 transition-all duration-200 ${isLoading ? "opacity-90 cursor-not-allowed" : ""}`} onClick={Login}>
              {isLoading ? "Logging in..." : "Login"}
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
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500 hover:underline transition-all duration-200"
              >
                Sign up
              </Link>
            </span>
            <span className="text-sm">
              Forgot your password?{" "}
              <Link
                href="/reset-password"
                className="text-blue-500 hover:underline transition-all duration-200"
              >
                Reset password
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
