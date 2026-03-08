import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                brand: {
                    primary: "#183362",
                    accent: "#09A16C",
                    text: "#5F6774",
                    bg: "#EFF0F2",
                    border: "#C1CCD5"
                },
                indigo: {
                    50: '#EFF0F2',
                    100: '#C1CCD5',
                    200: '#A1B1C5',
                    300: '#5F6774',
                    400: '#3D4A5E',
                    500: '#183362',
                    600: '#183362',
                    700: '#102242',
                    800: '#081121',
                    900: '#040811',
                },
                emerald: {
                    50: '#E6F6F0',
                    100: '#BFE7D7',
                    200: '#99D8BE',
                    300: '#73C9A6',
                    400: '#4DB98D',
                    500: '#09A16C', // brand accent
                    600: '#09A16C', // brand accent
                    700: '#078156',
                    800: '#056041',
                    900: '#02402B',
                }
            },
        },
    },
    plugins: [],
};
export default config;
