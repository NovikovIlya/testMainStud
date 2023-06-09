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
		<footer className="w-full min-h-[400px] bg-[#212121] text-white text-base">
			<div className="flex justify-around my-[100px] ">
				<div className='flex flex-col justify-center'>
					<LogoSvg />
					<div className=" flex flex-col mt-10 mb-5">
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
					<div className="flex gap-5 my-5">
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
