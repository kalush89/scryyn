"use client";
import React, { useState } from "react";
import Button from "../Button";
import { doctorSchema } from "@/utils/zodValidation/validateDoctor";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DoctorSignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const doctorSpecializations = [
    "General Practitioner",
    "Cardiologist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic Surgeon",
    "Gynecologist",
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fields = Object.fromEntries(formData);


    // Validate form data using Zod
    const validation = doctorSchema.safeParse(fields);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;

      // Transform fieldErrors to contain a single string per field
      const transformedErrors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0]])
      ) as Record<string, string | undefined>;

      setErrors(transformedErrors);
      console.log("formData", formData)
      console.log(errors)
    } else {
      setErrors({});
      setResponseMessage("");
      // Add form submission logic here (e.g., API call)
      console.log("Form data is valid:", validation.data);

      try {
        const response = await fetch("/api/doctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validation.data),
        });

        const responseData = await response.json(); // Correctly call .text()



        if (!response.ok) {
          setResponseMessage(responseData.message || "Failed to create account, please try again later.");
          // throw new Error(
          //     responseData.message || "Failed to create doctor"
          // );
        } else {
          console.log("the response", response);
          router.push("/confirmation");
        }

      } catch (error) {
        // console.error("Error creating doctor:", error);
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        setResponseMessage(errorMessage);

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
        <h2 id="form-title" className="sr-only">Doctor Registration Form</h2>
        {responseMessage && (
          <div
            className="text-red-500 text-sm mb-4"
            aria-live="polite"
            role="alert"
          >
            {responseMessage}
          </div>
        )}

        <div className="flex gap-4">
          <div className="relative w-1/2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder=" "
              className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
            <label
              htmlFor="firstName"
              className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
            >
              First Name
            </label>
            {errors.firstName && (
              <p
                className="text-red-500 text-sm mt-1"
                id="error-firstName"
                role="alert"
              >
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="relative w-1/2">
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder=" "
              className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
            <label
              htmlFor="lastName"
              className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
            >
              Last Name
            </label>
            {errors.lastName && (
              <p
                className="text-red-500 text-sm mt-1"
                id="error-lastName"
                role="alert"
              >
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative w-1/2">
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

          <div className="relative w-1/2">
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder=" "
              className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-required="true"
            />
            <label
              htmlFor="phone"
              className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
            >
              Phone Number
            </label>
            {errors.phone && (
              <p
                className="text-red-500 text-sm mt-1"
                id="error-phone"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="password"
            id="password"
            name="password"

            // onChange={(e) => setPassword(e.target.value)}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 " id="error-password"
              role="alert">{errors.password}</p>
          )}

        </div>

        <div className="relative">
          <select
            name="specialization"

            // onChange={(e) => setSpecialization(e.target.value)}
            className="bg-white border border-gray-300 w-full rounded-md px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-required="true"
          >
            <option value="" disabled>
              Select Specialization
            </option>
            {doctorSpecializations.map((spec, index) => (
              <option key={index} value={spec}>
                {spec}
              </option>
            ))}
          </select>
          {errors.specialization && (
            <p className="text-red-500 text-sm mt-1" id="error-specialization"
              role="alert">{errors.specialization}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"

            // onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
            aria-required="true"
          />
          <label
            htmlFor="licenseNumber"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            License Number
          </label>
          {errors.licenseNumber && (
            <p className="text-red-500 text-sm mt-1" id="error-licenseNumber"
              role="alert">{errors.licenseNumber}</p>
          )}
        </div>

        <div className="relative">
          <input
            type="text"
            id="address"
            name="address"

            // onChange={(e) => setLicenseNumber(e.target.value)}
            placeholder=" "
            className="peer bg-white text-gray-700 border border-gray-300 w-full rounded-md px-6 py-4 text-base focus:outline-none"
            aria-required="false"
          />
          <label
            htmlFor="address"
            className="absolute left-3 -top-0.5 text-base text-gray-500 transition-all transform scale-75 origin-[0] bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-0.5 peer-focus:scale-75 peer-focus:text-gray-700"
          >
            Address
          </label>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1" id="error-address"
              role="alert">{errors.address}</p>
          )}
        </div>
        <p className="text-xs my-1">
          By signing up, you agree to the
          <Link href="/terms" className="text-blue-500 underline focus:outline-none focus:ring-2 focus:ring-blue-500">
            Terms and Conditions
          </Link>
          and
          <Link href="/privacy" className="text-blue-500 underline focus:outline-none focus:ring-2 focus:ring-blue-500">
            Privacy Policy
          </Link>.
        </p>
        <div className="mt-4">
          <Button label="Agree and Register" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default DoctorSignUpForm;
