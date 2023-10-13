import { Button } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/image15.png'
import { useGetScheduleQuery } from '../../store/api/serviceApi'

type week =
	| 'sunday'
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
function getWeekDay(date: Date): week {
	let days: week[] = [
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
	let date = new Date(Date.now())
	const [activeButton, changeActive] = useState<week>(getWeekDay(date))
	const { data: schedule } = useGetScheduleQuery()

	const setActiveButton = (buttonName: week) => {
		if (activeButton !== buttonName) changeActive(buttonName)
	}

	const disableStyle = {
		color: 'white',
		border: 0,
		backgroundColor: 'inherit'
	}
	const activeStyles = {
		color: '#004EC2',
		border: 'solid 1px #004EC2',
		backgroundColor: 'white'
	}
	return (
		<div
			className="py-10 pl-10 flex w-full h-full  rounded-[1vw] text-white"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="flex flex-col h-full justify-between w-full min-w-[200px] max-w-sm">
				<span className="bg-none text-4xl font-bold text-start">Schedule</span>
				<div className="flex w-full flex-wrap gap-1 mb-14">
					<Button
						style={activeButton === 'monday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('monday')}
						className="text-lg font-bold h-[40px]"
					>
						Mon
					</Button>
					<Button
						style={activeButton === 'tuesday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('tuesday')}
						className="text-lg font-bold h-[40px]"
					>
						Tue
					</Button>
					<Button
						style={activeButton === 'wednesday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('wednesday')}
						className="text-lg font-bold h-[40px]"
					>
						Wed
					</Button>
					<Button
						style={activeButton === 'thursday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('thursday')}
						className="text-lg font-bold h-[40px]"
					>
						Thu
					</Button>
					<Button
						style={activeButton === 'friday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('friday')}
						className="text-lg font-bold h-[40px]"
					>
						Fri
					</Button>
					<Button
						style={activeButton === 'saturday' ? activeStyles : disableStyle}
						onClick={() => setActiveButton('saturday')}
						className="text-lg font-bold h-[40px]"
					>
						Sat
					</Button>
				</div>
			</div>
			<hr className="h-full w-[2px]  bg-white mx-3 border-none" />
			<div className="flex-col justify-start w-full max-w-fit min-w-min p-2 max-h-full overflow-y-auto">
				{schedule && schedule[activeButton].length ? (
					schedule[activeButton].map((el, index) => (
						<div className="flex w-full gap-x-[40px] mb-[20px]" key={index}>
							<span className="text-start min-w-[100px]">{el.time}</span>
							<span className="font-bold text-start">{el.name}</span>
						</div>
					))
				) : (
					<h3>there are no lessons, we are resting...</h3>
				)}
			</div>
			<div className="hidden  min-[1200px]:flex items-center justify-center w-full">
				<div className="bg-white rounded-full min-w-[180px] max-w-[180px] max-h-[180px] min-h-[180px] absolute"></div>
				<img
					src={img}
					alt=""
					width={'240px'}
					height={'210px'}
					className="bottom-[40px] z-10"
				/>
			</div>
			<div
				className="flex w-fit justify-center items-center "
				onClick={() => navigate('/services/schedule/schedule')}
			>
				<svg
					width="87"
					height="40"
					viewBox="0 0 87 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="cursor-pointer hover:scale-x-125  transition-all duration-200 mr-5"
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
