"use client"

import React from 'react'
import { useFormContext} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormData = {
  diagnosticProvider: {
    bankAccountNumber: string;
    bankName: string;
  };

};

export const DPBankingInfo = ({ nextStep, prevStep }: { nextStep: () => void, prevStep: () => void }) => {
  const {
    register,
    formState: { errors },
    trigger
  } = useFormContext<FormData>();

  const handleNext = React.useCallback(async () => {
    const valid = await trigger();
    console.log("From banking information")
    console.log("Validation result:", valid);
    console.log("Validation errors:", errors);
    if (valid) nextStep();
  }, [trigger, nextStep]);
  
  const handlePrev = React.useCallback(() => {
    prevStep();
  }, [prevStep]);




  return (
    <div className="space-y-4">
      <Input placeholder="Bank Name" {...register("diagnosticProvider.bankName")} />
      {errors.diagnosticProvider?.bankName?.message && (
        <p className="text-red-500 text-sm">{errors.diagnosticProvider.bankName.message.toString()}</p>
      )}

      <Input placeholder="Bank Account Number" {...register("diagnosticProvider.bankAccountNumber")} />
      {errors.diagnosticProvider?.bankAccountNumber?.message && (
        <p className="text-red-500 text-sm">{errors.diagnosticProvider.bankAccountNumber.message.toString()}</p>
      )}

      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={handlePrev}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>

    </div>
  )
}

