import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Exo 2'", "sans-serif"],
        body: ["'Jost'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
