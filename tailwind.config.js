module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        // "primary":"hsl(199, 75%, 47%)",
        // "secondary":"hsl(174, 86%, 54%)", 
        "primary":"hsl(174, 86%, 44%)", 
        dark:{
          100: "hsl(196, 100%, 9%)",
          200: "hsl(195, 100%, 6%)",
        },
        light:{
          100:"hsl(223, 100%, 100%)",
          200:"hsl(223, 56%, 94%)",
        },
        "light-1":"hsl(223, 100%, 100%)",
        "light-2":"hsl(223, 56%, 94%)",
      },  
      fontFamily: {
        'sans': ['"Poppins"','ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'display': ['Poppins'],
        'body': ['"Poppins"'],
      }
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}