import { Radio, Button } from 'antd'
import { respondStatus } from '../../../../store/reducers/type'
import {DepEmploymentItem} from './depEmploymentItem'

export const DepEmployment = () => {
	{/*
	const { data : employment_stage_items = [] } = useGetPersonnelStagesQuery()
	*/}


		const RadioRowComponent = () => {
			return (
				<div>

				</div>
			)
		}
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
			<ColumnFieldHeaderComponent></ColumnFieldHeaderComponent>
			<RadioRowComponent></RadioRowComponent>
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
	)
}