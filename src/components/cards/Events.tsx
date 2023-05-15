import { Button, Divider } from 'antd'
import React from 'react'

import { event } from './const'

export const Events = () => {
	const events = event.map((item, index) => (
		<div key={index} className="text-start  flex gap-[8px]">
			<div className="text-base w-max">{item.title}</div>
			<Divider className="border-black   m-0 mt-4 flex-1 min-w-fit" dashed />
			<div className="text-base font-semibold text-[#3073D7]">{item.date}</div>
		</div>
	))
	return (
		<div className="px-[52px] mt-[40px] ">
			<div className="font-semibold text-2xl text-start mb-[30px]">
				Мероприятия
			</div>
			<div className="max-h-[130px] flex flex-col gap-[20px] overflow-auto">
				{events}
			</div>
			<div className="text-start absolute bottom-[40px]">
				<Button
					type="primary"
					className="rounded-full w-[200px]  h-[50px] text-base font-semibold mt-[56px]"
				>
					Записаться
				</Button>
			</div>
		</div>
	)
}
