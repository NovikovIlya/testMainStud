import React from 'react'

import { blue1f5 } from '../../utils/color'

type TypeMenuSvgProps = {
	white?: boolean
}
export const SearchSvg = ({ white }: TypeMenuSvgProps) => {
	const color = () => (white ? 'white' : blue1f5)

	return (
		<svg
			width="22"
			height="23"
			viewBox="0 0 22 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M14.2016 14.907C13.4835 15.6213 12.631 16.1879 11.6928 16.5745C10.7545 16.961 9.74889 17.16 8.73333 17.16C6.68233 17.16 4.71532 16.3496 3.26504 14.907C1.81476 13.4644 1 11.5078 1 9.4677C1 7.42757 1.81476 5.471 3.26504 4.02842C4.71532 2.58583 6.68233 1.77539 8.73333 1.77539C9.74889 1.77539 10.7545 1.97436 11.6928 2.36093C12.631 2.74751 13.4835 3.31412 14.2016 4.02842C14.9197 4.74271 15.4894 5.59071 15.878 6.52398C16.2666 7.45725 16.4667 8.45753 16.4667 9.4677C16.4667 10.4779 16.2666 11.4781 15.878 12.4114C15.4894 13.3447 14.9197 14.1927 14.2016 14.907ZM14.2016 14.907L21 21.7754"
				stroke={color()}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
