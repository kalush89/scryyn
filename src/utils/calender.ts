// Generate options for day, month, and year
export const days = Array.from({ length: 31 }, (_, i) => i + 1);
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const years = Array.from({ length: 120 }, (_, i) => new Date().getFullYear() - i);