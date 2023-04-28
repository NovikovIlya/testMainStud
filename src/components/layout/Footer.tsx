import React from 'react'

import { LogoSvg } from '../../assets/svg'
import { DzenSvg } from '../../assets/svg/DzenSvg'
import { OkSvg } from '../../assets/svg/OkSvg'
import { TelegramSvg } from '../../assets/svg/TelegramSvg'
import { VkSvg } from '../../assets/svg/VkSvg'
import { YoutubeSvg } from '../../assets/svg/YoutubeSvg'

export const Footer = () => {
	return (
		<footer className="w-full min-h-[30vh] bg-[#212121] text-white font-sans">
			<div className="flex justify-around pt-[4vh] px-[2vh]">
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
					<div className="flex gap-[1vh] mt-[1.5vh]">
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
