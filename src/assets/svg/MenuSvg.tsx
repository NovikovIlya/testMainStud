import React from 'react'

type TypeMenuSvgProps = {
	white?: boolean
}
export const MenuSvg = ({ white }: TypeMenuSvgProps) => {
	const color = () => (white ? 'white' : '#1F5CB8')

	return (
		<svg
			width="22"
			height="12"
			viewBox="0 0 22 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.14844 1H20.9964"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M1.14844 5.93359H20.9964"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
			/>
			<path
				d="M1.14844 11H20.9964"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	)
}
