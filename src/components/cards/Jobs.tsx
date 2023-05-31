import { Button, Divider } from 'antd'
import React from 'react'

export const Jobs = () => {
	return (
		<div className="">
			<div className="mx-[40px] mt-[40px]">
				<div>
					<div className="font-semibold text-xl text-start">
						Об университете
					</div>
					<div className="mt-[30px] w-full">
						<div className="flex items-center justify-between ">
							<div className="text-base ">Инженер-программист</div>
							<div className="text-[#3073D7] text-xl flex">
								<div className="text-xl">от 25 000 р.</div>
							</div>
						</div>
						<Divider dashed className="border-black" />
						<div className="flex items-center justify-between ">
							<div className="text-base ">Медицинская сестра</div>
							<div className="text-[#3073D7] text-xl flex">
								<div className="text-xl">от 15 000 р.</div>
							</div>
						</div>
					</div>
				</div>
				<div className="text-start absolute bottom-[40px]">
					<Button className="rounded-full border-black  w-[200px] h-[50px] text-base font-semibold mt-[40px]">
						Изучить
					</Button>
				</div>
			</div>
		</div>
	)
}
