"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { patientSchema } from "@/lib/zod/validatePatient";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { CalendarIcon } from "lucide-react";

import { days, months, years } from "@/utils/calender";



type PatientFormData = z.infer<typeof patientSchema>;

export default function PatientRegistrationForm() {
  const methods = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      sex: "",
      dateOfBirth: "", // Ensure this matches the schema type
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: PatientFormData) => {
    try {
      console.log("Submitting patient data:", data);
      // Perform API call to register the patient
    } catch (error) {
      console.error("Error registering patient:", error);
    }
  };

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


  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Registration</CardTitle>
          <CardDescription>Please fill out the form below to register as a patient.</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full max-w-3xl mx-auto space-y-6"
            >
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="First Name" {...register("firstName")} />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {errors.firstName.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input placeholder="Last Name" {...register("lastName")} />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {errors.lastName.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Email" {...register("email")} />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <Input placeholder="Phone" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-red-500 text-sm">
                        {errors.phone.message?.toString()}
                      </p>
                    )}
                  </div>
                </div>

                <Input
                  placeholder="Password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message?.toString()}
                  </p>
                )}

                <Input placeholder="Address" {...register("address")} />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message?.toString()}
                  </p>
                )}

              {/* Date of Birth Dropdowns */}
              <div className="flex gap-4">
                  
                  
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Year</label>
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
                    <label className="block text-sm font-medium text-gray-700">Month</label>
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
                    <label className="block text-sm font-medium text-gray-700">Day</label>
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
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-sm">
                    {errors.dateOfBirth.message?.toString()}
                  </p>
                )}
                  
                  <Select
                      onValueChange={(value) => setValue("sex", value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.sex && (
                      <p className="text-red-500 text-sm">{errors.sex.message}</p>
                    )}
                  

                <div className="flex justify-between gap-2">
                  <Button type="submit">Sign up</Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}