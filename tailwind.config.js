export default {
  theme: {
    extend: {
      keyframes: {
        "hero-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "hero-glow-pulse": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(1.08)" },
        },
        "hero-code-line": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "status-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0", transform: "scale(1.6)" },
        },
        "terminal-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        "ambient-violet": {
          "0%, 100%": { transform: "translate3d(-2%, -2%, 0)" },
          "50%": { transform: "translate3d(2%, 2%, 0)" },
        },
        "ambient-blue": {
          "0%, 100%": { transform: "translate3d(2%, -2%, 0)" },
          "50%": { transform: "translate3d(-2%, 2%, 0)" },
        },
        "ambient-projects": {
          "0%, 100%": { transform: "translate3d(2%, 2%, 0)" },
          "50%": { transform: "translate3d(-2%, -2%, 0)" },
        },
        "ambient-contact": {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "hero-float": "hero-float 7s ease-in-out infinite",
        "hero-glow-pulse": "hero-glow-pulse 12s ease-in-out infinite",
        "hero-code-line": "hero-code-line 220ms ease-out forwards",
        "status-pulse": "status-pulse 1.8s ease-out infinite",
        "terminal-blink": "terminal-blink 1s steps(2, start) infinite",
        "ambient-violet": "ambient-violet 54s ease-in-out infinite",
        "ambient-blue": "ambient-blue 58s ease-in-out infinite",
        "ambient-projects": "ambient-projects 50s ease-in-out infinite",
        "ambient-contact": "ambient-contact 6s ease-in-out infinite",
      },
      backgroundImage: {
        noise: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
      },
    },
  },
};