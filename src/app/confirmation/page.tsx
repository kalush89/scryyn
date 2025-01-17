"use client"
import React, { useEffect, useRef } from "react";

const ConfirmationPage: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null); // Specify that the ref points to an <h1> element

  useEffect(() => {
    // Set focus to the heading on page load for screen readers
    headingRef.current?.focus();
  }, []);

  return (
    <main
      className="text-center p-6"
      aria-labelledby="confirmation-title"
    >
      <h1
        id="confirmation-title"
        ref={headingRef}
        className="text-2xl font-bold"
        tabIndex={-1} // Makes it focusable
      >
        Registration Successful
      </h1>
      <p
        className="mt-4"
        aria-live="polite" // Announces the message dynamically
      >
        You have successfully signed up to be our partner! Please wait for an email notification to confirm your account.
      </p>
    </main>
  );
};

export default ConfirmationPage;
