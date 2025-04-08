"use client"

import { LoginForm } from "@/components/login/login-form";

export default function LoginPage() {
  // const userType = searchParams.get("type"); // e.g., "admin" or "user"

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}