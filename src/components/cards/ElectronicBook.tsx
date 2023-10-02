import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/image23.png'

export const ElectronicBook = () => {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col px-7 py-8 justify-between h-full">
			<div className="flex">
				<div className="text-left">
					<div className="leading-7 text-xl font-bold ">
						Академический календарь
					</div>
					<div className="text-base font-normal leading-relaxed mt-7">
						Здесь находится план вашего обучения, предметы и отведенные для них
						часы
					</div>
				</div>
				<div className="max-sm:hidden w-full justify-center flex">
					<div className="bg-[#3E89F9] bg-opacity-80 w-[125px] h-[125px] rounded-full absolute -z-10 mt-3"></div>
					<img className="rounded-full w-[112px] h-[112px]" src={img} alt="" />
				</div>
			</div>
			<Button
				className="rounded-full w-[200px] h-[50px]"
				onClick={() => navigate('/services/electronicBook/estimation')}
			>
				Посмотреть
			</Button>
		</div>
	)
}
