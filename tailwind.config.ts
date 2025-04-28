import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "100%", backgroundSize: "200% 100%" },
          "100%": { backgroundPosition: "-100%", backgroundSize: "200% 100%" },
        },
      },
      animation: {
        shimmer: "shimmer 1s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
