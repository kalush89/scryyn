"use client";
import React, { useState } from "react";
import Button from "../Button";
import { signInSchema } from "@/utils/zodValidation/signIn";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [responseMessage, setResponseMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData(e.currentTarget);
    const fields = Object.fromEntries(formData);
  
    // Validate form data using Zod schema
    const validation = signInSchema.safeParse(fields);
  
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
        )
      );
    } else {
      setErrors({});
      setResponseMessage("");
  
      try {
        // Trigger NextAuth sign-in with credentials
        const result = await signIn("credentials", {
          redirect: false,
          email: fields.email,
          password: fields.password,
        });
  
        if (result?.error) {
          setResponseMessage("Invalid email or password.");
        } else {
           // Fetch user details to get the role
      const res = await fetch("/api/auth/session");
      const session = await res.json();
      console.log('the session', session)

      // Assume session.user.role contains the role
      const role = session?.user?.role;

      // Redirect based on role
      if (role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (role === "DOCTOR") {
        router.push("/dashboard/doctor");
      } else if (role === "LAB_ADMIN") {
        router.push("/dashboard/lab-admin");
      } else if (role === "LAB_TECHNICIAN"){
        router.push("/dashboard/lab-tech");
      }
        }
      } catch (error) {
        setResponseMessage("An error occurred during sign-in.");
        console.error("Sign-in error:", error);
      }
    }
  
    setIsLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-2"
        aria-labelledby="form-title"
      >
        <h2 id="form-title" className="sr-only">Sign In Form</h2>
        {responseMessage && (
          <div
            className="text-red-500 text-sm mb-4"
            aria-live="polite"
            role="alert"
          >
            {responseMessage}
          </div>
        )}

        
          <div className="relative ">
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" "
              className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
            <label
              htmlFor="email"
              className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
            >
              Email
            </label>
            {errors.email && (
              <p
                className="text-red-500 text-sm mt-1"
                id="error-email"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>

          

        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
            aria-required="true"
          />
          <label
            htmlFor="password"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={passwordVisible ? "Hide password" : "Show password"}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
          {errors.password && (
            <p
              className="text-red-500 text-sm mt-1"
              id="error-password"
              role="alert"
            >
              {errors.password}
            </p>
          )}
        </div>

        
        
        <div className="mt-4">
          <Button label="Agree and Register" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
