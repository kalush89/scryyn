"use client"
import { useSearchParams } from "next/navigation";
import { PatientLoginForm } from "@/components/login/patient-login-form";
import { AdminLoginForm } from "@/components/login/admin-login-form";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("type"); // e.g., "admin" or "user"

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
      {userType === "admin" ? <AdminLoginForm /> : <PatientLoginForm />}
    </div>
    </div>
  );
}