import { Button } from 'antd'
import React from 'react'

import { events } from './const'

export const Events = () => {
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
