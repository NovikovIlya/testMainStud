import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'
import React, { useState } from 'react'

type SessionProps = {
	title: string
	info: string
	href: string
	img?: string
	width?: number
	height?: number
	buttonText?: string
	buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
	mt?: string
	positionImage?: string
	isRounded?: boolean
}

export const Access = ({
	href,
	img,
	info,
	title,
	height = 112,
	width = 112,
	buttonText = 'Посмотреть',
	mt = 'mt-3',
	positionImage,
	isRounded,
	buttonType = 'default'
}: SessionProps) => {
	const [messageApi, contextHolder] = message.useMessage()
	const error = () => {
		messageApi.open({
			type: 'error',
			content:
				'Access is denied, if you want to access this service, contact support'
		})
	}

	return (
		<div className="flex flex-col px-7 py-8 justify-between h-full max-[874px]:p-0 max-[874px]:py-3 max-[874px]:items-center ">
			<div className="flex max-[874px]:flex-col max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
				<div className="text-left">
					<div className="leading-7 text-xl font-bold whitespace-nowrap">
						{title}
					</div>
					<div className="text-base font-normal leading-relaxed mt-7 max-[874px]:hidden">
						{info}
					</div>
				</div>
			</div>
			<Button
				type={buttonType}
				className="rounded-full w-[200px] h-[50px] max-[874px]:hidden"
				onClick={error}
			>
				{buttonText}
			</Button>
			{contextHolder}
		</div>
	)
}
