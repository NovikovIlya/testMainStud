import React from 'react'

import {
	DzenSvg,
	LogoSvg,
	OkSvg,
	TelegramSvg,
	VkSvg,
	YoutubeSvg
} from '../../assets/svg'

export const Footer = () => {
	const year = new Date().getFullYear()

	return (
		<footer className="w-full min-h-[200px] text-base py-14 flex max-md:flex-col justify-between container mx-auto px-3">
			<div className="flex  flex-col">
				<div className="flex mb-10 max-sm:flex-col">
					<LogoSvg />
					<div className=" flex flex-col max-sm:mt-7">
						<span>
							<strong>Адрес:</strong> 420008 г. Казань, ул. Кремлевская, 18
						</span>
						<span>
							<strong>Email:</strong> public.mail@kpfu.ru
						</span>
					</div>
				</div>
				<span>
					<strong>© {year} Казанский федеральный университет</strong>
				</span>
			</div>
			<div className="flex flex-col max-sm:mt-7">
				<span>
					<strong>Соцсети:</strong>
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
