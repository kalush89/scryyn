"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { login } from "@/app/actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogInIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation schema using zod
const loginSchema = z.object({
  email: z.string().email("Please enter your email address."),
  password: z.string().min(8, "Please enter your password."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
  
    // Set loading state to true at the start of the login process
    setIsLoading(true);
    setServerError(null); // Clear any previous errors
  
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
  
      if (result?.error) {
        // Handle specific error codes
        if (result.error === "CredentialsSignin") {
          setServerError("Invalid email or password. Please try again.");
        } else if (result.error === "Configuration") {
          setServerError("There is an issue with the server configuration. Please contact support.");
        } else {
          setServerError("An unexpected error occurred. Please try again.");
        }
      } else {
        // Redirect to the dashboard on successful login
        router.replace("/dashboard");
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      // Set loading state to false after the login process completes
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>login to your account</CardTitle>
          <CardDescription>enter your email and password below to login.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server Error Message */}
  {serverError && (
    <p className="text-sm text-red-500 text-left">{serverError}</p>
  )}

              {/* Submit Button */}
              <Button type="submit" size="wide-lg" disabled={isLoading}>
    {isLoading ? "logging in..." : "login"}
  </Button>
              
            </form>
          </Form>

          {/* OR Separator */}
          <div className="flex items-center gap-2 mt-5 mb-5">
            <div className="flex-1 h-px bg-muted"></div>
            <span className="text-xl text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-muted"></div>
          </div>

          {/* Login with Google */}
          <Button variant="outline" size="wide-lg" onClick={() => login("google")}>
            login with Google
          </Button>

          {/* Links */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}