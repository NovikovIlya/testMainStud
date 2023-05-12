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
		<footer className="w-full min-h-[30vh] bg-[#212121] text-white text-[1.5vh]">
			<div className="flex justify-around pt-[4vh] max-md:px-[8vh] max-sm:flex-col max-sm:gap-[2vh]">
				<div>
					<LogoSvg />
					<div className="my-[2vh] flex flex-col">
						<span>
							<strong>Адрес:</strong> 420008 г. Казань, ул. Кремлевская, 18
						</span>
						<span>
							<strong>Email:</strong> public.mail@kpfu.ru
						</span>
					</div>
					<span>
						<strong>© 2023 Казанский федеральный университет</strong>
					</span>
				</div>
				<div className="flex flex-col">
					<span>
						<strong>Соцсети:</strong>
					</span>
					<div className="flex gap-[1vh] my-[1.5vh]">
						<VkSvg />
						<YoutubeSvg />
						<DzenSvg />
						<OkSvg />
						<TelegramSvg />
					</div>
				</div>
			</div>
		</footer>
	)
}
