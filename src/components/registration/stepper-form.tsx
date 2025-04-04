"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiagnosticsProviderInfo } from "./steps/diagnostics-provider-info";
import { ManagerInfo } from "./steps/manager-info";
// import { DPBankingInfo } from "./steps/banking-info";
import { ReviewAndSubmit } from "./steps/review-and-submit";
import { diagnosticProviderRegistrationSchema } from "@/lib/zod/diagnosticProviderRegistration";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
// import { Progress } from "../ui/progress"; // Remove unused import
import { cn } from "@/lib/utils";
import { RegistrationFormData } from "@/models/diagnostics-provider-reg";


const steps = [
  { id: 1, title: "Diagnostic Provider Information", description: "Provide details about the diagnostic provider." },
  { id: 2, title: "Manager Information", description: "Enter the manager's personal and contact information." },
  // { id: 3, title: "Banking Information", description: "Fill in the facility's banking details for payment processing." },
  { id: 3, title: "Review & Submit", description: "Review all entered information before submitting the form." },
];
export default function StepperForm() {
  const stepSchemas = [
    diagnosticProviderRegistrationSchema.pick({ diagnosticProvider: true }),
    diagnosticProviderRegistrationSchema.pick({ manager: true }),
    //diagnosticProviderRegistrationSchema.pick({ diagnosticProvider: true }),
    diagnosticProviderRegistrationSchema, // Full schema for review and submit
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    resolver: zodResolver(stepSchemas[currentStep - 1] as any),
    defaultValues: {
      diagnosticProvider: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        rcNumber: "",
      },
      manager: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
      },
    },
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <DiagnosticsProviderInfo nextStep={nextStep} />;
      case 2:
        return <ManagerInfo nextStep={nextStep} prevStep={prevStep} />;
      // case 3:
      //   return <DPBankingInfo nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <ReviewAndSubmit prevStep={prevStep} />;
      default:
        return null;
    }
  };
// console.log("Form errors:", methods.formState.errors);
  const handleSubmit = async (data: RegistrationFormData) => {
    // console.log("Form submitted with data:", data);
    
    try {
      const response = await fetch("/api/diagnostics-provider", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Response:", result);
        // Success toast or redirect
      } else {
        const error = await response.json();
        console.error("Error:", error);
        // Error toast
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <ProgressIndicator currentStep={currentStep} />

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="w-full max-w-3xl mx-auto space-y-6"
            >
              {renderStepComponent()}
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex-1 flex flex-col items-center">
          <div
            className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
              currentStep === step.id
                ? 'bg-primary text-white'
                : currentStep > step.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
            )}
          >
            {step.id}
          </div>
          <div className="text-xs text-center mt-1">{step.title}</div>
        </div>
      ))}
    </div>
  )
}
