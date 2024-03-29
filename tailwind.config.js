const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            black: colors.black,
            white: colors.white,
            red: colors.red,
            orange: colors.orange,
            amber: colors.amber,
            yellow: colors.yellow,
            lime: colors.lime,
            green: colors.green,
            emerald: colors.emerald,
            teal: colors.teal,
            cyan: colors.cyan,
            sky: colors.sky,
            blue: colors.blue,
            indigo: colors.indigo,
            violet: colors.violet,
            purple: colors.purple,
            fuchsia: colors.fuchsia,
            pink: colors.pink,
            rose: colors.rose,
            gray: {
                50: "#F8F5FF",
                100: "#cabceb",
                200: "#a791db",
                300: "#7653c2",
                400: "#503194",
                500: "#3d2475",
                600: "#25144d",
                700: "#150931",
                800: "#0e0426",
                900: "#09001F",
            },
            primary: "#6E2FFF",
            secondary: "#A781FE",
            tertiary: "#EE2FFF",
            transparent: "transparent",
        },
        extend: {
            backgroundImage: {
                "img-hero": 'url("/images/heroBgBlur.png")',
            },
            keyframes: {
                "fade-in-up": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(18px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
                "fade-in-down": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(-18px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
                "fade-in-left": {
                    "0%": {
                        opacity: 0,
                        transform: "translateX(-24px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateX(0)",
                    },
                },
                "fade-in-right": {
                    "0%": {
                        opacity: 0,
                        transform: "translateX(24px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateX(0)",
                    },
                },
                "fade-in": {
                    "0%": {
                        opacity: 0,
                    },
                    "100%": {
                        opacity: 1,
                    },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 700ms ease-in-out 300ms forwards",
                "fade-in-down": "fade-in-down 700ms ease-in-out 300ms forwards",
                "fade-in-left": "fade-in-left 700ms ease-in-out 300ms forwards",
                "fade-in-right": "fade-in-right 700ms ease-in-out 300ms forwards",
                "fade-in": "fade-in 700ms ease-in-out 300ms forwards",
            },
            strokeWidth: {
                3: "3px",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "ui-sans-serif",
                    "system-ui",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    '"Segoe UI"',
                    "Roboto",
                    '"Helvetica Neue"',
                    "Arial",
                    '"Noto Sans"',
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            fontSize: {
                "2xs": "0.6rem",
                "3xs": "0.5rem",
            },
            borderWidth: {
                1: "1px",
            },
        },
    },
    plugins: [],
}
