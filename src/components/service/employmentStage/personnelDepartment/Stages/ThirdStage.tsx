import { GreenCheck } from '../../../../../assets/svg/GreenCheck'
import React from 'react'

export const ThirdStage = () => {
	return (
		<div className="w-full py-[20px] bg-[#FFFFFF]">
			<div className="flex flex-row justify-between pr-[200px]">
				<div className="flex flex-row pl-[20px] items-center">
					<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
					<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Трудовые условия»</h3>
				</div>
				<div className="flex flex-row items-center gap-[12px]">
					<div className="w-[11px] h-[11px] rounded-[100%] bg-[#FFD600]"></div>
					<span>Доработка</span>
				</div>
			</div>
			<div className="flex flex-row pl-[20px] pt-[20px] gap-[12px]">
				<GreenCheck></GreenCheck>
				<span className="text-[16px]/[19.2px] font-normal">Соискатель ознакомлен с трудовыми условиями</span>
			</div>
			<div className="flex flex-col pl-[20px] gap-[4px] mt-[20px]">
				<span className="text-[14px]/[16.8px] text-black opacity-[40%] font-normal">Комментарий на доработку: </span>
				<span className="text-[14px]/[16.8px] text-black opacity-[60%] font-normal">Ваши документы вообще не подходят, отправьте пожалуйста заново.<button
					className="ml-[4px] border-none cursor-pointer bg-white text-[14px]/[16.8px] font-bold text-black opacity-[100%]">Развернуть</button></span>
			</div>
		</div>
	)
}