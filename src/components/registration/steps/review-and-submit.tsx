"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";

export const ReviewAndSubmit = ({ prevStep }: { prevStep: () => void}) => {
  const { getValues } = useFormContext();

  // Retrieve all form data
  const formData = getValues();

  return (
    <div className="space-y-6">

      {/* Display Diagnostic Provider Information */}
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-medium">Diagnostic Provider Information</h3>
        <p><strong>Name:</strong> {formData.diagnosticProvider?.name}</p>
        <p><strong>Email:</strong> {formData.diagnosticProvider?.email}</p>
        <p><strong>Phone:</strong> {formData.diagnosticProvider?.phone}</p>
        <p><strong>Address:</strong> {formData.diagnosticProvider?.address}</p>
        <p><strong>City:</strong> {formData.diagnosticProvider?.city}</p>
        <p><strong>State:</strong> {formData.diagnosticProvider?.state}</p>
        <p><strong>RC Number:</strong> {formData.diagnosticProvider?.rcNumber}</p>
        <p><strong>Latitude:</strong> {formData.diagnosticProvider?.latitude}</p>
        <p><strong>Longitude:</strong> {formData.diagnosticProvider?.longitude}</p>
      </div>

      {/* Display Manager Information */}
      <div className="border p-4 rounded-md">
        <h3 className="text-lg font-medium">Manager Information</h3>
        <p><strong>First Name:</strong> {formData.manager?.firstName}</p>
        <p><strong>Last Name:</strong> {formData.manager?.lastName}</p>
        <p><strong>Email:</strong> {formData.manager?.email}</p>
        <p><strong>Phone:</strong> {formData.manager?.phone}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit" >
          Submit
        </Button>
      </div>
    </div>
  );
};


