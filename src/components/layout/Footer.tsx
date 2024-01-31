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
					<strong>© 2023 Казанский федеральный университет</strong>
				</span>
			</div>
			<div className="flex flex-col max-sm:mt-7">
				<span>
					<strong>Соцсети:</strong>
				</span>
				<div className="flex gap-3 mt-5">
					<VkSvg />
					<YoutubeSvg />
					<DzenSvg />
					<OkSvg />
					<TelegramSvg />
				</div>
			</div>
		</footer>
	)
}
