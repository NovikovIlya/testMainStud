import { GreenCheck } from '../../../../../assets/svg/GreenCheck'
import React from 'react'

export const FifthStage = () => {
	return (
		<div className="w-full py-[20px] gap-[20px] bg-[#FFFFFF]">
			<div className="flex flex-row pl-[20px] items-center">
				<h3 className="font-bold text-[16px]/[19.2px]">5 ЭТАП</h3>
				<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Инструктаж»</h3>
			</div>
			<div className="flex flex-row pl-[20px] pt-[20px] gap-[12px]">
				<GreenCheck></GreenCheck>
				<span className="text-[16px]/[19.2px] font-normal">Соискатель прошел инструктаж</span>
			</div>
		</div>
	)
}