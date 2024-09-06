/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				blue167: '#1677ff',
				blue1f5: '#1F5CB8',
				blue307: '#3073D7',
				blue004: '#004EC2',
				blue65A: '#65A1FA'
			},
			animation: {
				'bounce-slow': 'bounce 3s  1 ease-in-out',
				'fade-in': 'fadeIn 0.6s ease-in-out',
			},
			keyframes: {
				fadeIn: {
				  '0%': { opacity: 0 },
				  '100%': { opacity: 1 },
				},
			  },
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
