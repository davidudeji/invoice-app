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
                }
            },
        },
    },
    plugins: [],
};
export default config;
