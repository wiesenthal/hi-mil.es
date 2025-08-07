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
        fadeIn: {
          "0%": { opacity: "1", filter: "blur(3px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        fadeIn2: {
          "0%": { opacity: "0", filter: "blur(4px)" },
          "50%": { opacity: "0.5", filter: "blur(3px)" },
          "100%": { opacity: "1", filter: "blur(0px)" },
        },
        pullIn: {
          "0%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        "heart-beat": {
          "0%, 10%, 50%, 90%, 100%": { scale: "1" },
          "40%, 60%": { scale: "1.5" },
        },
      },
      animation: {
        shimmer: "shimmer 1s linear infinite",
        "fade-in": "fadeIn 0.15s ease-out",
        "fade-in-2": "fadeIn2 0.3s ease-out",
        "bg-pull-in": "pullIn 0.15s ease-out",
        "heart-beat": "heart-beat 0.5s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
