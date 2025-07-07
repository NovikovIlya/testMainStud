import { Card } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { QrCode } from '../assets/svg/QrCode'

const QrCodeDesktop = () => {
	const { t } = useTranslation()

	return (
		<div
			className="md:hidden mb-5 shadow-md p-5 flex items-center justify-between rounded-[20px]  cursor-pointer hover:shadow-lg "
			style={{
				background: '#FFFFFF',
			

			}}
		>
			<span className="text-2xl font-bold flex gap-2">
				<div className='flex flex-wrap items-center'><QrCode white={false} /></div>
				<div className='text-[#1F5CB8]'>{t('qrcode')}</div>
				</span>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="flex-shrink-0"
			>
				<path d="M9 18L15 12L9 6" stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	)
}

export default QrCodeDesktop
