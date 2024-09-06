import { Radio, Button } from 'antd'
import { respondStatus } from '../../../../store/reducers/type'
import {DepEmploymentItem} from './depEmploymentItem'
export const DepEmployment = () => {
	{/*
	const { data : employment_stage_items = [] } = useGetPersonnelStagesQuery()
	*/}

	{/*
	const radioRowComponent = () => {
		return (
			<div className="mt-[52px] mb-[40px] flex items-center gap-[16px]">
				<Radio.Group
					className="flex gap-[8px]"
				>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							status === respondStatus[respondStatus.IN_RESERVE]
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`} className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
						status === respondStatus[respondStatus.IN_RESERVE]
							? 'text-white bg-dasha-blue'
							: 'text-black border-solid border-black border-[1px]'
					} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'все'} className="hidden"></Radio>
						все
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							status === respondStatus[respondStatus.IN_RESERVE]
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio
							value={respondStatus[respondStatus.IN_RESERVE]}
							className="hidden"
						></Radio>
						на проверке
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							status === respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio
							value={respondStatus[respondStatus.IN_SUPERVISOR_REVIEW]}
							className="hidden"
						></Radio>
						доработка
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font ${
							status === respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px]'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio
							value={respondStatus[respondStatus.IN_PERSONNEL_DEPT_REVIEW]}
							className="hidden"
						></Radio>
						принято
					</label>
				</Radio.Group>
			</div>
		)
	}
	*/}
	const ColumnFieldHeaderComponent = () => {
		return (
			<div className="flex flex-row mt-[40px]">
				<span className="ml-[1.5%] w-[24%] text-[14px] text-[#626364] font-normal">Соискатель</span>
				<span className="w-[26%] text-[14px] text-[#626364] font-normal">Должность</span>
				<span className="w-[10%] text-[14px] text-[#626364] font-normal">Статус</span>
				<div className='w-[38.5%]'></div>
			</div>
		)
	}
	return (
		<>
			<div id="wrapper" className="flex flex-col bg-[#F5F8FB] px-[53px] pt-[120px] w-full">
				<h1 className="text-[28px] font-normal text-[#000000]">Этап трудоустройства</h1>
				<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
				<div className="flex flex-col gap-[12px]">
					<DepEmploymentItem status={'revision'}></DepEmploymentItem>
					<DepEmploymentItem status={'oncheck'}></DepEmploymentItem>
					<DepEmploymentItem status={'accepted'}></DepEmploymentItem>
					{/*
				{employment_stage_items.map(item => (
					<DepEmploymentItem {...item} key={item.id} />
				))}
				*/}
				</div>
			</div>
		</>
	)
}
