"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ReviewAndSubmit = ({ prevStep, isSubmitting }: { prevStep: () => void; isSubmitting: boolean }) => {
  const { getValues } = useFormContext();

  // Retrieve all form data
  const formData = getValues();

  return (
    <div className="space-y-8">

      {/* Diagnostic Provider Information */}
      <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Diagnostic Provider Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Name:</strong> {formData.diagnosticProvider?.name || "N/A"}</p>
          <p><strong>Email:</strong> {formData.diagnosticProvider?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {formData.diagnosticProvider?.phone || "N/A"}</p>
          <p><strong>Address:</strong> {formData.diagnosticProvider?.address || "N/A"}</p>
          <p><strong>City:</strong> {formData.diagnosticProvider?.city || "N/A"}</p>
          <p><strong>State:</strong> {formData.diagnosticProvider?.state || "N/A"}</p>
          <p><strong>RC Number:</strong> {formData.diagnosticProvider?.rcNumber || "N/A"}</p>
          <p><strong>Latitude:</strong> {formData.diagnosticProvider?.latitude || "N/A"}</p>
          <p><strong>Longitude:</strong> {formData.diagnosticProvider?.longitude || "N/A"}</p>
        </div>
      </div>

      {/* Manager Information */}
      <div className="border border-gray-300 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Manager Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>First Name:</strong> {formData.manager?.firstName || "N/A"}</p>
          <p><strong>Last Name:</strong> {formData.manager?.lastName || "N/A"}</p>
          <p><strong>Email:</strong> {formData.manager?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {formData.manager?.phone || "N/A"}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button size="lg" variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button size="lg" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};