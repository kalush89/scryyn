"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patientSchema } from "@/lib/zod/validatePatient";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { months, years } from "@/utils/calender";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // Import icons for visibility toggle
import { login } from "@/app/actions";

type PatientFormData = z.infer<typeof patientSchema>;

export default function PatientRegistrationForm() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      dateOfBirth: "", // Ensure this matches the schema type
    },
  });

  const { setValue, watch, handleSubmit, formState: { errors } } = form;

  // Local state for day, month, and year
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [days, setDays] = useState<number[]>([]); // Dynamically update days based on month and year

  // Update the number of days based on the selected month and year
  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the selected month
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1)); // Create an array of days
    }
  }, [month, year]);

  // Combine day, month, and year into a single string
  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      setValue("dateOfBirth", formattedDate); // Update the form state with the formatted date
    }
  }, [day, month, year, setValue]);

  const onSubmit = async (data: PatientFormData) => {
    try {
      console.log("Submitting patient data:", data);
      setIsLoading(true);
      setServerError(null); 

      const response = await fetch("/api/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      

      if (result.error) {
        setServerError(result.error);
      } else {
        console.log("Patient registered successfully:", result);
        // Optionally redirect or show success message
        // window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error registering patient:", error);
      setIsLoading(false);
      setServerError("An unexpected error occurred. Please try again.");
    } finally{
      setIsLoading(false);
    }

  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Book tests. Track your health. It's that easy..</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>

                        <FormControl>
                          <Input placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>

                        <FormControl>
                          <Input placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>

                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>

                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>

                    <FormControl>
                    <div className="relative">
                      <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                                  <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" aria-hidden="true" />
                        ) : (
                          <EyeIcon className="w-5 h-5" aria-hidden="true" />
                        )}
                      </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth</FormLabel>
                <div className="flex flex-col md:flex-row gap-1">
                  <div className="flex-1">

                    <Select onValueChange={(value) => setYear(parseInt(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">

                    <Select onValueChange={(value) => setMonth(parseInt(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month, index) => (
                          <SelectItem key={month} value={(index + 1).toString()}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1">

                    <Select onValueChange={(value) => setDay(parseInt(value))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toString()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
                )}
              />

              {/* Gender */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server Error Message */}
              {serverError && (
                <p className="text-sm text-red-500 text-left">{serverError}</p>
              )}

              <div className="flex flex-col gap-3">
                {/* Submit Button */}
                <Button type="submit" size="wide-lg" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Sign up"}
                </Button>


              </div>
            </form>
          </Form>
          {/* OR Separator */}
          <div className="flex items-center gap-2 mt-5 mb-5">
            <div className="flex-1 h-px bg-muted"></div>
            <span className="text-sm text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-muted"></div>
          </div>
          <Button
            variant="outline"
            size="wide-lg"
            onClick={() => login("google")}
          >
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}




