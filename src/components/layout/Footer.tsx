import React from 'react'

import {
	DzenSvg,
	LogoSvg,
	OkSvg,
	TelegramSvg,
	VkSvg,
	YoutubeSvg
} from '../../assets/svg'
import { useTranslation } from 'react-i18next'
import { LogoSvgEn } from '../../assets/svg/LogoSvgEn'

export const Footer = () => {
	const year = new Date().getFullYear()
	const {t,i18n} =  useTranslation()
	console.log('i18n',i18n.language)
	return (
		<footer className="w-full min-h-[200px] text-base py-14 flex max-md:flex-col justify-between container mx-auto px-3">
			<div className="flex  flex-col">
				<div className="flex mb-10 max-sm:flex-col">
					{i18n.language==='ru' ? <LogoSvg /> : <LogoSvgEn />}
					<div className=" flex flex-col max-sm:mt-7">
						<span>
							<strong>{t('adress2')}:</strong> {t('adress3')}
						</span>
						<span>
							<strong>Email:</strong> public.mail@kpfu.ru
						</span>
					</div>
				</div>
				<span>
					<strong>© {year} {t('copywrigh')}</strong>
				</span>
			</div>
			<div className="flex flex-col max-sm:mt-7">
				<span>
					<strong>{t('soc')}:</strong>
				</span>
				<div className="flex gap-3 mt-5">
					<a href='https://vk.com/kazan_federal_university'><VkSvg /></a>
					<a href='https://www.youtube.com/univertv'><YoutubeSvg /></a>
					<a href='https://dzen.ru/kazan_federal_university'><DzenSvg /></a>
					<a href='https://ok.ru/kznuniversity'><OkSvg /></a>
					<a href='https://t.me/s/kznuniversity'><TelegramSvg /></a>
				</div>
			</div>
		</footer>
	)
}
