import { Typography } from 'antd'
import React from 'react'

const { Title } = Typography
export const BackMainPage = () => {
	return (
		<div className="flex items-center gap-[10px] my-[50px] ml-[50px]">
			<svg
				width="8"
				height="11"
				viewBox="0 0 8 11"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M6.69336 1L0.999929 5.5C3.22335 7.25736 4.46994 8.24264 6.69336 10"
					stroke="black"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

			<Title style={{ margin: 0 }} level={5}>
				Назад на главную
			</Title>
		</div>
	)
}
