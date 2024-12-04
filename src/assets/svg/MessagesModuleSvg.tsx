import React from 'react'

import { blue1f5 } from '../../utils/color'
import { Badge } from 'antd'

type TypeMenuSvgProps = {
	white?: boolean
}
export const MessageModuleSvg = ({ white }: TypeMenuSvgProps) => {
	const color = () => (white ? 'white' : blue1f5)

	return (
		
		<div style={{ width: '24px', height: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
		<svg
			width="23"
			height="23"
			viewBox="0 0 26 23"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			
			<path d="M7.48056 18.2245H6.98205C2.99402 18.2245 1 17.2275 1 12.2425V7.25744C1 3.26941 2.99402 1.27539 6.98205 1.27539H14.9581C18.9462 1.27539 20.9402 3.26941 20.9402 7.25744V12.2425C20.9402 16.2305 18.9462 18.2245 14.9581 18.2245H14.4596C14.1505 18.2245 13.8514 18.3741 13.662 18.6233L12.1665 20.6174C11.5085 21.4947 10.4317 21.4947 9.77368 20.6174L8.27817 18.6233C8.11864 18.404 7.74975 18.2245 7.48056 18.2245Z" stroke={color()} stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
			<path d="M5.98438 7.25586H15.9545M5.98438 12.2409H11.9664" stroke={color()} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
		</div>
		
	)
}
