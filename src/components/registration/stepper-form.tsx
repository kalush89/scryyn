"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiagnosticsProviderInfo } from "./steps/diagnostics-provider-info";
import { ManagerInfo } from "./steps/manager-info";
// import { DPBankingInfo } from "./steps/banking-info";
import { ReviewAndSubmit } from "./steps/review-and-submit";
import { diagnosticProviderRegistrationSchema } from "@/lib/zod/diagnosticProviderRegistration";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { CheckCircle, User, ClipboardList } from "lucide-react"; // Import icons
import { BriefcaseMedicalIcon} from "lucide-react";
import { cn } from "@/lib/utils";
import { RegistrationFormData } from "@/models/diagnostics-provider-reg";
import { Separator } from "../ui/separator";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
console.log("the current step is", currentStep);
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
        return <ReviewAndSubmit prevStep={prevStep} isSubmitting={isSubmitting}/>;
      default:
        return null;
    }
  };

  


const handleSubmit = async (data: RegistrationFormData) => {
  setIsSubmitting(true); // Set loading state
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
  } finally {
    setIsSubmitting(false); // Reset loading state
  }
};
  return (
    <div className="w-full max-w-xl mx-auto p-4 space-y-6">
      <ProgressIndicator currentStep={currentStep} />

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
          <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <Separator />
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

// function StepContent({ children, currentStep }: { children: React.ReactNode; currentStep: number }) {
//   return (
//     <div className="relative overflow-hidden w-full">
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           transform: `translateX(-${(currentStep - 1) * 100}%)`, // Shift the steps horizontally
//         }}
//       >
//         {React.Children.map(children, (child) => (
//           <div className="w-full flex-shrink-0">{child}</div> // Each step takes full width
//         ))}
//       </div>
//     </div>
//   );
// }



const stepIcons = {
  1: <BriefcaseMedicalIcon className="w-6 h-6" />, // Icon for Step 1
  2: <User className="w-6 h-6" />, // Icon for Step 2
  3: <CheckCircle className="w-6 h-6" />, // Icon for Step 3
};

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex justify-between items-center w-full">
      {steps.map((step) => (
        <div key={step.id} className="flex-1 flex flex-col items-center">
          <div
            className={cn(
              "rounded-full flex items-center justify-center font-medium",
              currentStep === step.id
                ? "bg-yellow-500 text-white w-14 h-14 "
                : currentStep > step.id
                ? "bg-primary text-white w-10 h-10"
                : "bg-gray-300 text-gray-600 w-10 h-10"
            )}
          >
            {stepIcons[step.id as keyof typeof stepIcons]} {/* Replace step.id with the corresponding icon */}
          </div>
          {/* Optional: Add step title below the icon */}
          {/* <div className="text-xs text-center mt-1">{step.title}</div> */}
        </div>
      ))}
    </div>
  );
}
