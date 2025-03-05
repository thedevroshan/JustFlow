"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

// Utils
import { ValidateLogin, IAuthFieldError } from "../utils/ValidateAuthFields";

// API
import { LoginAPI } from "../api/authAPI";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<string>("password");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fetchingError, setFetchingError] = useState<string>("");
  const [errors, setErrors] = useState<IAuthFieldError[] | null>(null);

  const { mutateAsync: Login, isPending } = useMutation({
    mutationFn: LoginAPI,
    onSuccess: (data) => {
      if (!data.ok) {
        setFetchingError(data.message);
        return;
      }
      setFetchingError("");
      setErrors(null);
      window.location.href = "/home";
    },
  });

  const HandleLogin = async () => {
    const error: IAuthFieldError[] | null = ValidateLogin(
      email,
      password
    );
    if (error != null) {
      setErrors(error);
      return;
    }
    setErrors(null);
    await Login({ email, password });
  }

  return (
    <>
      <section className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Link href={"/"} className="absolute top-0 left-0 text-xsm pl-4 pt-3">
          Back To Home
        </Link>

        <div className="flex flex-col items-start justify-start gap-2 w-[70vw] sm:w-[50vw] md:w-[40vw] lg:w-[28vw] h-fit border border-primary-border bg-white rounded-lg shadow-lg px-3 py-3">
          <span className="text-2xl font-semibold">Login</span>

          {fetchingError && (
            <span className="text-red-500 select-none mx-auto text-sm">
              {fetchingError}
            </span>
          )}

          <input
            type="text"
            placeholder="Email"
            className="w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 outline-none"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={async (e)=>{
                if(e.key === "Enter"){
                  await HandleLogin()
                }
            }}
          />

          {errors != null &&
            errors.find((error) => error.field === "email") && (
              <span className="text-red-500 select-none text-sm">
                {errors.find((error) => error.field === "email")?.message}
              </span>
            )}

          <div className="w-full flex flex-col h-fit items-end justify-center">
            <input
              type={showPassword}
              placeholder="Password"
              className="w-full py-1 font-medium text-lg shadow-xs border border-primary-border rounded-md px-3 select-none outline-none"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={async (e)=>{
                if(e.key === "Enter"){
                  await HandleLogin()
                }
              }}
            />
            {errors != null &&
              errors.find((error) => error.field === "password") && (
                <span className="text-red-500 select-none mr-auto text-sm">
                  {errors.find((error) => error.field === "password")?.message}
                </span>
              )}

            <span
              className="absolute pr-2 cursor-pointer select-none"
              onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                if (showPassword === "password") {
                  setShowPassword("text");
                  return;
                }
                setShowPassword("password");
              }}
            >
              {showPassword == "password" ? "Show" : "Hide"}
            </span>
          </div>
          <button
            className={`w-full py-2 cursor-pointer hover:bg-black-btn-hover transition-all duration-200 rounded-lg bg-black text-white ${
              isPending ? "cursor-not-allowed opcatiy-90" : ""
            }`}
            onClick={async () => {
              await HandleLogin();
            }}
          >
            {isPending ? "Logging in..." : "Login"}
          </button>

          <span className="text-xl text-primary-text mx-auto">OR</span>

          <div className="w-full flex flex-col gap-2 justify-between items-center">
            <button className="bg-white w-full py-1 border border-primary-border rounded-lg hover:bg-gray-200 cursor-pointer shadow-2xs transition-all duration-150">
              Continue With Google
            </button>
            <button className="bg-white w-full py-1 border border-primary-border rounded-lg hover:bg-gray-200 cursor-pointerr shadow-2xs transition-all duration-150 cursor-pointer">
              Continue With GitHub
            </button>
          </div>

          <span className="text-xl text-primary-text mx-auto">OR</span>

          <div className="w-full flex flex-col gap-2 justify-between items-center pb-4">
            <span className="text-sm">
              Don't have an account?
              <Link href={"/signup"} className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </span>
            <span className="text-sm">
              Forgot Password?
              <Link
                href={"/forgot-password"}
                className="text-blue-600 hover:underline"
              >
                Reset Password
              </Link>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
