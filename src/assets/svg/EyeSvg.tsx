import React from 'react'

type TypeMenuSvgProps = {
	white?: boolean
}
export const EyeSvg = ({ white }: TypeMenuSvgProps) => {
	const color = () => (white ? 'white' : '#1F5CB8')

	return (
		<svg
			width="26"
			height="23"
			viewBox="0 0 26 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M17.3902 11.7775C17.3902 14.1702 15.428 16.1037 12.9998 16.1037C10.5716 16.1037 8.60938 14.1702 8.60938 11.7775C8.60938 9.38471 10.5716 7.45117 12.9998 7.45117C15.428 7.45117 17.3902 9.38471 17.3902 11.7775Z"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M13 21.7754C17.3291 21.7754 21.3638 19.2618 24.1722 14.9113C25.2759 13.2074 25.2759 10.3434 24.1722 8.63944C21.3638 4.28898 17.3291 1.77539 13 1.77539C8.67092 1.77539 4.63618 4.28898 1.8278 8.63944C0.724067 10.3434 0.724067 13.2074 1.8278 14.9113C4.63618 19.2618 8.67092 21.7754 13 21.7754Z"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
