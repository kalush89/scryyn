import { useEffect, useState } from "react";

export function useDateOfBirth(setValue: (name: string, value: string) => void) {
  const [day, setDay] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [days, setDays] = useState<number[]>([]);

  // Update the number of days based on the selected month and year
  useEffect(() => {
    if (month && year) {
      const daysInMonth = new Date(year, month, 0).getDate(); // Get the number of days in the selected month
      setDays(Array.from({ length: daysInMonth }, (_, i) => i + 1)); // Create an array of days
    }
  }, [month, year]);

  // Combine day, month, and year into a single string
  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      setValue("dateOfBirth", formattedDate); // Update the form state with the formatted date
    }
  }, [day, month, year, setValue]);

  return {
    day,
    setDay,
    month,
    setMonth,
    year,
    setYear,
    days,
  };
}