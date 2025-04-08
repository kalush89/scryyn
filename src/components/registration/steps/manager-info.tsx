"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

type FormData = {
    manager: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone: string;
    },
};

export const ManagerInfo = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
const [showPassword, setShowPassword] = React.useState(false);
    const {
        register,
        formState: { errors },
        trigger
    } = useFormContext<FormData>();

    const handleNext = React.useCallback(async () => {
        const valid = await trigger();
        console.log("Validation result:", valid);
        console.log("Validation errors:", errors);
        if (valid) nextStep();
    }, [trigger, nextStep]);

    const handlePrev = React.useCallback(() => {
        prevStep();
    }, [prevStep]);

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="flex-1">

                    <Input placeholder="First Name" {...register("manager.firstName")} />
                    {errors.manager?.firstName?.message && (
                        <p className="text-red-500 text-sm">{errors.manager.firstName.message.toString()}</p>
                    )}
                </div>
                <div className="flex-1">
                    <Input placeholder="Last Name" {...register("manager.lastName")} />
                    {errors.manager?.lastName?.message && (
                        <p className="text-red-500 text-sm">{errors.manager.lastName.message.toString()}</p>
                    )}
                </div>
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <Input placeholder="Email" {...register("manager.email")} />
                    {errors.manager?.email?.message && (
                        <p className="text-red-500 text-sm">{errors.manager.email.message.toString()}</p>
                    )}
                </div>
                <div className="flex-1">
                    <Input  placeholder="Phone" {...register("manager.phone")}   />
                    
                    {errors.manager?.phone?.message && (
                        <p className="text-red-500 text-sm">{errors.manager.phone.message.toString()}</p>
                    )}
                </div>
            </div>

            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("manager.password")}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" aria-hidden="true" />
                    ) : (
                        <EyeIcon className="w-5 h-5" aria-hidden="true" />
                    )}
                </button>
            </div>
            {errors.manager?.password?.message && (
                <p className="text-red-500 text-sm">{errors.manager.password.message.toString()}</p>
            )}
            <p className="text-gray-500 text-sm">
                Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and a special character.
            </p>

            <div className="flex justify-between gap-2">
                <Button size="lg" variant="outline" onClick={handlePrev}>Back</Button>
                <Button size="lg" onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

