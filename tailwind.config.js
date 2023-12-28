/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
	theme: {
		extend: {
			colors: {
				bluekfu: '#1677ff'
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
