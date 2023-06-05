/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx,scss}'],
	theme: {
		extend: {
			colors: {
				EllipseColor: '#7fc3e5',
				bluekfu: '#1677ff'
			}
		}
	},
	corePlugins: {
		preflight: false
	},
	plugins: []
}
