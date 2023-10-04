import type { Config } from "tailwindcss";

const pxToRem = (px: number, base = 16) => `${px / base}rem`;

const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    spacing: {
      ...range(0, 500).reduce((acc: { [key: string]: string }, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    extend: {
      colors: {
        gray: {
          100: "#F9F9F9",
          200: "#F5F5F5",
          300: "#F0F0F0",
          400: "#E5E5E5",
          500: "#D9D9D9",
          600: "#C4C4C4",
          700: "#8E8E8E",
          750: "#8D8D8D",
          800: "#767676",
          850: "#4C4C4C",
          900: "#3E3E3E",
        },
        red: "#FB0045",
        orange: "#FF8A00",
        yellow: "#FFC500",
        green: "#60E820",
        blue: "#0002FF",
        purple: "#AD00FF",
      },
    },
  },
  plugins: [],
};
export default config;
