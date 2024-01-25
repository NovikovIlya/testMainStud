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
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
