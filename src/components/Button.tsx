import React from "react";
import Spinner from "./Spinner";

// Define the props interface
interface ButtonProps {
  label: string;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, isLoading }) => {
  return (
    <button
      // disabled={isLoading}
      type="submit"
      className={`btn ripple btn-large-full btn-navy ${isLoading ? "cursor-not-allowed" : ""}`}
    >
      {isLoading ? <Spinner /> : label}
    </button>
  );
};

export default Button;