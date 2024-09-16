import { Button } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/image15.png'
import { useGetScheduleQuery } from '../../store/api/serviceApi'
import { blue004 } from '../../utils/color'
import { week } from '../../models/cards'


function getWeekDay(date: Date): week {
	const days: week[] = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday'
	]

	return days[date.getDay()]
}
export const Schedule = () => {
	const navigate = useNavigate()
	const date = new Date(Date.now())
	const [activeButton, changeActive] = useState<week>(getWeekDay(date))
	const { data: schedule } = useGetScheduleQuery()
	const { t } = useTranslation()

	

	const setActiveButton = (buttonName: week) => {
		if (activeButton !== buttonName) changeActive(buttonName)
	}

	const disableStyle = {
		color: 'white',
		border: 0,
		backgroundColor: 'inherit'
	}
	const activeStyles = {
		color: blue004,
		border: 'solid 1px blue004',
		backgroundColor: 'white'
	}
	return (
		<div
			className="py-10 pl-10 max-xl:p-5 max-md:p-10 flex w-full h-full max-[560px]:flex-col rounded-[20px] text-white max-md:justify-center"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="flex flex-col h-full justify-between w-full  max-w-sm max-md:justify-center max-md:gap-5">
				<span className="bg-none text-4xl font-bold text-start max-[560px]:text-center max-xl:text-3xl max-md:text-2xl">
					{t('Schedule')}
				</span>
				<Button
					className="hidden max-md:flex max-[560px]:hidden !rounded-full w-fit !px-5"
					size="large"
				>
					{t('GoOver')}
				</Button>
				<div className="flex w-full flex-wrap gap-1 mb-14 max-md:hidden">
					<Button
						style={activeButton === 'monday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('monday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Mon')}
					</Button>
					<Button
						style={activeButton === 'tuesday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('tuesday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Tue')}
					</Button>
					<Button
						style={activeButton === 'wednesday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('wednesday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Wed')}
					</Button>
					<Button
						style={activeButton === 'thursday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('thursday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Thu')}
					</Button>
					<Button
						style={activeButton === 'friday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('friday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Fri')}
					</Button>
					<Button
						style={activeButton === 'saturday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('saturday')}
						className="text-lg font-bold h-[40px]"
					>
						{t('Sat')}
					</Button>
				</div>
			</div>
			<div className="hidden max-md:flex items-center justify-center w-full">
				<div className="bg-white rounded-full w-[125px] h-[125px]  absolute"></div>
				<img
					src={img}
					alt=""
					width={160}
					height={160}
					className="bottom-[40px] z-10"
				/>
			</div>
			<hr className="h-full w-[2px]  bg-white mx-3 border-none max-md:hidden" />
			<div className="flex-col justify-start w-full max-w-fit min-w-min p-2 max-h-full overflow-y-auto max-xl:text-sm max-md:hidden">
				{schedule && schedule[activeButton] !== undefined ? (
					// schedule[activeButton].length - если сейчас вскр, то крашает весь фронт
					schedule[activeButton].map((el, index) => (
						<div
							className="flex w-full gap-x-10 mb-5 max-xl:gap-x-0 max-xl:mb-3 max-xl:flex-col"
							key={index}
						>
							<span className="text-start ">{el.time}</span>
							<span className="font-bold text-start">{el.name}</span>
						</div>
					))
				) : (
					<h3>{t('NoLesson')}</h3>
				)}
			</div>
			<div className="flex max-xl:hidden items-center justify-center w-full">
				<div className="bg-white rounded-full w-44 h-44  absolute"></div>
				<img
					src={img}
					alt=""
					width={'240px'}
					height={'210px'}
					className="bottom-[40px] z-10"
				/>
			</div>
			<div
				className="flex max-xl:hidden w-fit justify-center items-center "
				onClick={() => navigate('/services/schedule/schedule')}
			>
				<svg
					width="87"
					height="40"
					viewBox="0 0 87 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer hover:scale-x-125  transition-all duration-200 mr-20"
				>
					<path
						d="M1 20.4528C1 20.4528 52.8054 20.4528 86 20.4528M86 20.4528C80.4447 12.856 71.7748 1 71.7748 1M86 20.4528C80.4447 27.6959 71.7748 39 71.7748 39"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	)
}
