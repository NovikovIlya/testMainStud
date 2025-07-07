// import React from 'react'

// import {
// 	DzenSvg,
// 	LogoSvg,
// 	OkSvg,
// 	TelegramSvg,
// 	VkSvg,
// 	YoutubeSvg
// } from '../../assets/svg'
// import { useTranslation } from 'react-i18next'
// import { LogoSvgEn } from '../../assets/svg/LogoSvgEn'
// import { RutubeSvg } from '../../assets/svg/RutubeSvg'

// export const Footer = () => {
// 	const year = new Date().getFullYear()
// 	const {t,i18n} =  useTranslation()
// 	console.log('i18n',i18n.language)
// 	return (
// 		<footer className="w-full min-h-[200px] text-base py-14 flex max-md:flex-col justify-between px-10 mx-auto  max-w-[1650px] ">
// 			<div className="flex  flex-col ">
// 				<div className="flex mb-10 max-sm:flex-col">
// 					{i18n.language==='ru' ? <LogoSvg /> : <LogoSvgEn />}
// 					<div className=" flex flex-col max-sm:mt-7">
// 						<span className='max-w-[500px]'>
// 							<strong className=''>{t('adress2')}:</strong> {t('adress3')}
// 						</span>
// 						<span>
// 							<strong>Email:</strong> {t('email1')}
// 						</span>
// 					</div>
// 				</div>
// 				<span>
// 					<strong>© {year} {t('copywrigh')}</strong>
// 				</span>
// 			</div>
// 			<div className="flex flex-col max-sm:mt-7">
// 				<span>
// 					<strong>{t('soc')}:</strong>
// 				</span>
// 				<div className="flex gap-3 mt-5">
// 					<a href='https://vk.com/kazan_federal_university'><VkSvg /></a>
// 					<a href='https://rutube.ru/u/univertv/'><RutubeSvg /></a>
// 					<a href='https://www.youtube.com/univertv'><YoutubeSvg /></a>
// 					<a href='https://dzen.ru/kazan_federal_university'><DzenSvg /></a>
// 					<a href='https://ok.ru/kznuniversity'><OkSvg /></a>
// 					<a href='https://t.me/s/kznuniversity'><TelegramSvg /></a>
// 				</div>
// 			</div>
// 		</footer>
// 	)
// }
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
import { RutubeSvg } from '../../assets/svg/RutubeSvg'

export const Footer = () => {
	const year = new Date().getFullYear()
	const { t, i18n } = useTranslation()
	
	return (
		<footer className="w-full min-h-[200px] bg-white">
			<div className=" sm:max-w-[1650px] mx-auto px-12 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-14">
				<div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12">
					{/* Левая секция с логотипом и контактами */}
					<div className="flex flex-col">
						{/* Логотип и адрес */}
						<div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6 sm:mb-10">
							<div className="flex-shrink-0">
								{i18n.language === 'ru' ? <LogoSvg /> : <LogoSvgEn />}
							</div>
							<div className="flex flex-col gap-2 text-sm sm:text-base">
								<span className="max-w-full sm:max-w-[500px] break-words">
									<strong className="font-semibold">{t('adress2')}:</strong>{' '}
									<span className="text-gray-700">{t('adress3')}</span>
								</span>
								<span className="break-all">
									<strong className="font-semibold">Email:</strong>{' '}
									<span className="text-gray-700">{t('email1')}</span>
								</span>
							</div>
						</div>
						
						{/* Копирайт */}
						<span className="text-sm sm:text-base text-gray-600">
							<strong>© {year} {t('copywrigh')}</strong>
						</span>
					</div>
					
					{/* Правая секция с социальными сетями */}
					<div className="flex flex-col">
						<span className="text-sm sm:text-base mb-4 sm:mb-5">
							<strong className="font-semibold">{t('soc')}:</strong>
						</span>
						<div className="grid grid-cols-3 sm:flex gap-3 sm:gap-4 ">
							<a 
								href='https://vk.com/kazan_federal_university' 
								className="flex items-center   hover:opacity-80 transition-opacity"
								aria-label="VKontakte"
							>
								<VkSvg />
							</a>
							<a 
								href='https://rutube.ru/u/univertv/' 
								className="flex items-center justify-center  hover:opacity-80 transition-opacity"
								aria-label="Rutube"
							>
								<RutubeSvg />
							</a>
							<a 
								href='https://www.youtube.com/univertv' 
								className="flex items-center justify-end   hover:opacity-80 transition-opacity"
								aria-label="YouTube"
							>
								<YoutubeSvg />
							</a>
							<a 
								href='https://dzen.ru/kazan_federal_university' 
								className="flex items-center   hover:opacity-80 transition-opacity"
								aria-label="Dzen"
							>
								<DzenSvg />
							</a>
							<a 
								href='https://ok.ru/kznuniversity' 
								className="flex items-center justify-center   hover:opacity-80 transition-opacity"
								aria-label="Odnoklassniki"
							>
								<OkSvg />
							</a>
							<a 
								href='https://t.me/s/kznuniversity' 
								className="flex items-center justify-end   hover:opacity-80 transition-opacity"
								aria-label="Telegram"
							>
								<TelegramSvg />
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}