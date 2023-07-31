import React from 'react';


type TypeMenuSvgProps = {
	white?: boolean
}
export const MessageSvg = ({ white }: TypeMenuSvgProps) => {
	const color = () => (white ? 'white' : '#1F5CB8')

	return (
		<svg
			width="22"
			height="23"
			viewBox="0 0 22 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.48056 18.7245H6.98205C2.99402 18.7245 1 17.7275 1 12.7425V7.75744C1 3.76941 2.99402 1.77539 6.98205 1.77539H14.9581C18.9462 1.77539 20.9402 3.76941 20.9402 7.75744V12.7425C20.9402 16.7305 18.9462 18.7245 14.9581 18.7245H14.4596C14.1505 18.7245 13.8514 18.8741 13.662 19.1233L12.1665 21.1174C11.5085 21.9947 10.4317 21.9947 9.77368 21.1174L8.27817 19.1233C8.11864 18.904 7.74975 18.7245 7.48056 18.7245Z"
				stroke={color()}
				strokeWidth="2"
				strokeMiterlimit="10"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M5.98438 7.75586H15.9545M5.98438 12.7409H11.9664"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}