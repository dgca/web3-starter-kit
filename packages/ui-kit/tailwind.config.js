const sharedConfig = require("ui-utils/tailwind/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: ["./components/**/*.{js,ts,jsx,tsx}"],
};
