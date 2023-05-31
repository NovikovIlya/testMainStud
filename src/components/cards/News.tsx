import { Button } from 'antd'
import React from 'react'

import img from '../../assets/images/news.png'

export const News = () => {
	return (
		<div className="flex h-[320px]">
			<div className="ml-[40px] mt-[40px]">
				<div>
					<div className="font-semibold text-xl text-start">Новости</div>
					<div className="text-base text-start mt-[30px] w-[255px]">
						Каждый из нас понимает очевидную вещь: убеждённость некоторых
						оппонентов влечет за собой процесс.
					</div>
				</div>
				<div className="text-start absolute bottom-[40px]">
					<Button className="rounded-full border-black  w-[200px] h-[50px] text-base font-semibold mt-[40px]">
						Посмотреть
					</Button>
				</div>
			</div>
			<div className="min-w-[125px] absolute right-[30px] min-h-[125px] ml-[15px] mt-[50px] mr-[50px] max-h-[125px] bg-[#3E89F9] bg-opacity-80 rounded-full">
				<img className="absolute -right-6" src={img} alt="" />
			</div>
		</div>
	)
}
