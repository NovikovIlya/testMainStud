import { Button } from 'antd'

export const EmploymentStageInfo = () => {
	return (
		<div className='w-full flex flex-col px-[53px] mt-[140px]'>
			<h1 className='font-normal text-[28px]/[28px]'>Алексеев Дмитрий Иванович</h1>
			<Button
			type='default'
			className='max-w-[102px] mt-[20px] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]'>Резюме</Button>
			<h3 className='mt-[53px] text-[18px] font-normal'>Вакансия: <span className='font-bold'>Специалист отдела развития сотрудничества</span></h3>
			<div className='mt-[40px] mb-[100px] gap-[12px] flex flex-col '>
				<div className='flex flex-col w-full h-[200px] bg-[#FFFFFF]'>
					<div className='flex flex-row pl-[20px] pt-[27px] items-center'>
						<h3 className="font-bold text-[16px]/[19.2px]">2 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Прикрепление документов»</h3>
					</div>
					<div>

					</div>
				</div>
				<div className="w-full h-[100px] bg-[#FFFFFF]">
					<div className="flex flex-row pl-[20px] pt-[27px] items-center">
						<h3 className="font-bold text-[16px]/[19.2px]">3 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Трудовые условия»</h3>
					</div>
				</div>
				<div className="w-full h-[140px] bg-[#FFFFFF]">
					<div className="flex flex-row pl-[20px] pt-[27px] items-center">
						<h3 className="font-bold text-[16px]/[19.2px]">4 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Медицинский осмотр»</h3>
					</div>
				</div>
				<div className="w-full h-[100px] bg-[#FFFFFF]">
					<div className="flex flex-row pl-[20px] pt-[27px] items-center">
						<h3 className='font-bold text-[16px]/[19.2px]'>5 ЭТАП</h3>
						<h3 className="font-normal ml-[37px] text-[18px]/[21.6px]">«Инструктаж»</h3>
					</div>
				</div>
			</div>
		</div>
	)
}