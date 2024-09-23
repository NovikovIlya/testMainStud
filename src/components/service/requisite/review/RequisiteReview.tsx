import { DepEmploymentItem } from '../../employmentStage/personnelDepartment/depEmploymentItem'
import { useGetPersonnelStagesQuery } from '../../../../store/api/serviceApi'
import { useState } from 'react'
import { Button } from 'antd'


export const RequisiteReview = () => {

	const { data: employment_stage_items = [] } = useGetPersonnelStagesQuery();

	const verifyingItems = employment_stage_items.filter(item => item.status === 'VERIFYING');
	const refineItems = employment_stage_items.filter(item => item.status === 'REFINE');
	const completeItems = employment_stage_items.filter(item => item.status === 'COMPLETE');
	const allItems = [...verifyingItems, ...refineItems, ...completeItems]

	const [currentFilterItem, setCurrentFilterItem] = useState('all')
	const isActive = (filter: string) => currentFilterItem === filter;

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
			<h1 className="text-[28px] font-normal text-[#000000]">Просмотр реквизитов</h1>
			<div className="flex flex-row gap-[12px] mt-[52px]">
				<Button
					id="buttonEmploymentStageAll"
					className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
						isActive('ALL') ? 'bg-[#1F5CB8] text-white border-[1px] border-[1F5CB8]' : 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
					}`}
					onClick={() => setCurrentFilterItem('ALL')}
				>
					все
				</Button>
				<Button
					id="buttonEmploymentStageOncheck"
					className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
						isActive('VERIFYING') ? 'bg-[#1F5CB8] text-white border-[1px] border-[1F5CB8]' : 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
					}`}
					onClick={() => setCurrentFilterItem('VERIFYING')}
				>
					на проверке
				</Button>
				<Button
					id="buttonEmploymentStageRevision"
					className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
						isActive('REFINE') ? 'bg-[#1F5CB8] text-white border-[1px] border-[1F5CB8]' : 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
					}`}
					onClick={() => setCurrentFilterItem('REFINE')}
				>
					доработка
				</Button>
				<Button
					id="buttonEmploymentStageAccepted"
					className={`px-[16px] py-[8px] font-normal rounded-[54.5px] text-[16px]/[16px] cursor-pointer ${
						isActive('COMPLETE') ? 'bg-[#1F5CB8] text-white border-[1px] border-[1F5CB8]' : 'bg-[#F5F8FB] text-[#4A4B4C] border-[#4A4B4C] border-[1px]'
					}`}
					onClick={() => setCurrentFilterItem('COMPLETE')}
				>
					принято
				</Button>
			</div>
			<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
			<div className="flex flex-col mt-[16px] pb-[50px] gap-[12px]">
				{(currentFilterItem === 'ALL') && (
					<div className="flex flex-col gap-[12px]">
						{allItems.map(item => (
							<DepEmploymentItem {...item} key={item.respondId}></DepEmploymentItem>
						))}
					</div>
				)}
				{(currentFilterItem === 'VERIFYING') && (
					<div className="flex flex-col gap-[12px]">
						{verifyingItems.map(item => (
							<DepEmploymentItem {...item} key={item.respondId}></DepEmploymentItem>
						))}
					</div>
				)}
				{(currentFilterItem === 'REFINE') && (
					<div className="flex flex-col gap-[12px]">
						{refineItems.map(item => (
							<DepEmploymentItem {...item} key={item.respondId}></DepEmploymentItem>
						))}
					</div>
				)}
				{(currentFilterItem === 'COMPLETE') && (
					<div className="flex flex-col gap-[12px]">
						{completeItems.map(item => (
							<DepEmploymentItem {...item} key={item.respondId}></DepEmploymentItem>
						))}
					</div>
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