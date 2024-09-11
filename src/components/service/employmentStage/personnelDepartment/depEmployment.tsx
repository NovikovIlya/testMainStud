import { Radio, Button } from 'antd'
import { respondStatus } from '../../../../store/reducers/type'
import {DepEmploymentItem} from './depEmploymentItem'
import { boolean } from 'yup'
import { useState } from 'react'
import { button } from '@material-tailwind/react'
import { current } from '@reduxjs/toolkit'

export const DepEmployment = () => {
	{/*
	const { data : employment_stage_items = [] } = useGetPersonnelStagesQuery()
	*/}

	const [currentFilterItem, setCurrentFilterItem] = useState('all')


	const ColumnFieldHeaderComponent = () => {
		return (
			<div className="flex flex-row mt-[40px]">
				<span className="ml-[1.5%] w-[24%] text-[14px] text-[#626364] font-normal">Соискатель</span>
					<span className="w-[26%] text-[14px] text-[#626364] font-normal">Должность</span>
					<span className="w-[10%] text-[14px] text-[#626364] font-normal">Статус</span>
					<div className="w-[38.5%]"></div>
				</div>
			)
		}

	return (
		<div id="wrapper" className="flex flex-col bg-[#F5F8FB] px-[53px] pt-[120px] w-full">
			<h1 className="text-[28px] font-normal text-[#000000]">Этап трудоустройства</h1>
			<div className="flex flex-row gap-[12px] mt-[52px]">
				<button
					id='buttonEmploymentStageAll'
					className="border-0 px-[16px] py-[8px] bg-[#1F5CB8] font-normal text-white rounded-[54.5px] text-[16px]/[16px] cursor-pointer"
					onClick={() => {
						setCurrentFilterItem('all')
					}}>
					все
				</button>
				<button
					id='buttonEmploymentStageOncheck'
					className={`bg-[#FFFFFF] border-[#4A4B4C] border cursor-pointer px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] text-[#4A4B4C]`}
					onClick={() => {
						setCurrentFilterItem('oncheck')
					}}>
					на проверке
				</button>
				<button
					id='buttonEmploymentStageRevision'
					className="border-[#4A4B4C] border px-[16px] py-[8px] cursor-pointer bg-[#FFFFFF] font-normal rounded-[54.5px] text-[16px]/[16px] text-[#4A4B4C]"
					onClick={() => {
						setCurrentFilterItem('revision')
					}}>
					доработка
				</button>
				<button
					id='buttonEmploymentStageAccepted'
					className="border-[#4A4B4C] border px-[16px] py-[8px] cursor-pointer bg-[#FFFFFF] font-normal rounded-[54.5px] text-[16px]/[16px] text-[#4A4B4C]"
					onClick={() => {
						setCurrentFilterItem('accepted')
					}}>
					принято
				</button>
			</div>
			<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
			<div className="flex flex-col mt-[16px] pb-[50px] gap-[12px]">
				{(currentFilterItem === 'all') && (
					<>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'oncheck'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
					</>
				)}
				{(currentFilterItem === 'oncheck') && (
					<>
						<DepEmploymentItem status={'oncheck'}></DepEmploymentItem>
					</>
				)}
				{(currentFilterItem === 'revision') && (
					<>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
						<DepEmploymentItem status={'revision'}></DepEmploymentItem>
					</>
				)}
				{(currentFilterItem === 'accepted') && (
					<>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
						<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
					</>
				)}
				{/*
				{employment_stage_items.map(item => (
					<DepEmploymentItem {...item} key={item.id} />
				))}
				*/}
			</div>
		</div>
	)
}