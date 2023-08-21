import React from 'react'

export const DocumentSvg = ({ white }: { white?: boolean }) => {
	const color = () => (white ? 'white' : '#1F5CB8')

	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 22 22"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.75 8H7.25M14.75 14H7.25M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
