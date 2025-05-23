"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { stateCityMapping } from "@/utils/stateCityMapping";
import React, { useState } from "react";

type FormData = {
  diagnosticProvider: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    latitude: string;
    longitude: string;
    rcNumber: string;
    // rrbnLicenseNumber: string;
    // mlscnLicenseNumber: string;
  };
};

export const DiagnosticsProviderInfo = ({ nextStep }: { nextStep: () => void }) => {
  const {
    watch,
    setValue,
    register,
    formState: { errors },
    trigger,
  } = useFormContext<FormData>();

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [cities, setCities] = useState<string[]>([]);

  const selectedState = watch("diagnosticProvider.state");

  const handleStateChange = (state: string) => {
    setValue("diagnosticProvider.state", state);
    setCities(stateCityMapping[state] || []);
    setValue("diagnosticProvider.city", "");
  };

  const handleCityChange = (city: string) => {
    setValue("diagnosticProvider.city", city);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
  
    setLoadingLocation(true);
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setValue("diagnosticProvider.latitude", latitude.toString());
        setValue("diagnosticProvider.longitude", longitude.toString());
        setLoadingLocation(false);

        // Format accuracy with a comma as a thousand separator
      const formattedAccuracy = new Intl.NumberFormat().format(parseInt(accuracy.toFixed(0)));
      alert(`Location retrieved successfully! Accuracy: ${formattedAccuracy} meters`);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve location. Please try again.");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleNext = React.useCallback(async () => {
    const valid = await trigger();
    if (valid) nextStep();
  }, [trigger, nextStep]);

  return (
    <div className="space-y-4">
      <Input placeholder="Facility name" {...register("diagnosticProvider.name")} />
      {errors.diagnosticProvider?.name?.message && (
        <p className="text-red-500 text-sm">{errors.diagnosticProvider.name.message.toString()}</p>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <Input placeholder="Facility email" {...register("diagnosticProvider.email")} />
          {errors.diagnosticProvider?.email?.message && (
            <p className="text-red-500 text-sm">{errors.diagnosticProvider.email.message.toString()}</p>
          )}
        </div>
        <div className="flex-1">
          <Input placeholder="Facility phone" {...register("diagnosticProvider.phone")} />
          {errors.diagnosticProvider?.phone?.message && (
            <p className="text-red-500 text-sm">{errors.diagnosticProvider.phone.message.toString()}</p>
          )}
        </div>
      </div>

      <Input placeholder="Facility address" {...register("diagnosticProvider.address")} />
      {errors.diagnosticProvider?.address?.message && (
        <p className="text-red-500 text-sm">{errors.diagnosticProvider.address.message.toString()}</p>
      )}

      <div className="flex gap-4">
        <div className="flex-1">
          <Select onValueChange={handleStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(stateCityMapping).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.diagnosticProvider?.state?.message && (
            <p className="text-red-500 text-sm">{errors.diagnosticProvider.state.message}</p>
          )}
        </div>
        <div className="flex-1">
          <Select onValueChange={handleCityChange} disabled={!selectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.diagnosticProvider?.city?.message && (
            <p className="text-red-500 text-sm">{errors.diagnosticProvider.city.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Please use the "Get Current Location" button to capture the latitude and longitude of the diagnostics facility. Ensure you are physically at the facility when capturing the location.
        </p>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input placeholder="Latitude" {...register("diagnosticProvider.latitude")} readOnly />
          </div>
          <div className="flex-1">
            <Input placeholder="Longitude" {...register("diagnosticProvider.longitude")} readOnly />
          </div>
        </div>
        <Button type="button" onClick={handleGetLocation} disabled={loadingLocation}>
          {loadingLocation ? "Getting location..." : "Get current location"}
        </Button>
      </div>

      <Input placeholder="Company RC number" {...register("diagnosticProvider.rcNumber")} />
      {errors.diagnosticProvider?.rcNumber && (
        <p className="text-red-500 text-sm">{errors.diagnosticProvider.rcNumber.message}</p>
      )}


      <div className="flex justify-end gap-2">
        <Button size="lg" onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
};
