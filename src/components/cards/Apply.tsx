import { Button } from 'antd'
import { useState } from 'react'

import img from '../../assets/images/avatar.png'

export const Apply = () => {
	const [activeApply, setActiveApply] = useState<
		'bachelor' | 'magistracy' | 'PhD' | 'residency'
	>('bachelor')
	const disableStyle = {
		color: '#004EC2',
		border: '1px solid #004EC2',
		cursor: 'default',
		backgroundColor: 'white'
	}
	const activeStyle = {
		color: 'white',
		backgroundColor: 'transparent'
	}
	return (
		<div
			className="rounded-[1vw] w-full pl-[55px] flex h-full overflow-y-auto"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className='max-w-[53vw] max-2xl:max-w-[40vw] max-xl:max-w-full '>
				<div className="text-4xl  text-white w-fit font-extrabold  mt-[76px] max-2xl:mt-[36px]">
					Подать заявление
				</div>
				<div className="mt-[40px] gap-4 flex flex-wrap">
					<Button
						onClick={() => {
							setActiveApply('bachelor')
						}}
						type="text"
						style={activeApply === 'bachelor' ? disableStyle : activeStyle}
						className={`w-[203px] font-bold h-[62px] text-2xl  hover:border-white hover:border`}
					>
						Бакалавриат
					</Button>
					<Button
						onClick={() => {
							setActiveApply('magistracy')
						}}
						type="text"
						style={activeApply === 'magistracy' ? disableStyle : activeStyle}
						className={`w-[203px] ml-[50px] font-bold h-[62px] text-2xl  hover:border-white hover:border`}
					>
						Магистратура
					</Button>
					<Button
						onClick={() => {
							setActiveApply('PhD')
						}}
						style={activeApply === 'PhD' ? disableStyle : activeStyle}
						type="text"
						className="w-[203px]  text-white font-bold h-[62px] text-2xl ml-[50px] hover:border-white hover:border"
					>
						Аспирантура
					</Button>
					<Button
						onClick={() => {
							setActiveApply('residency')
						}}
						style={activeApply === 'residency' ? disableStyle : activeStyle}
						type="text"
						className="w-[203px]  text-white font-bold h-[62px] text-2xl ml-[50px] hover:border-white hover:border transition-all duration-500"
					>
						Ординатура
					</Button>
				</div>
			</div>
			<div className='max-xl:hidden'>
				<img
					className="rounded-full absolute right-[200px] -top-[130px]"
					src={img}
					alt="avatar"
				/>
			</div>
			<div className="max-xl:hidden absolute right-[108px] cursor-pointer hover:scale-x-125 hover:right-20 w-[100px] hover:w-[120px] transition-all duration-200 h-full flex items-center">
				<svg
					width="87"
					height="40"
					viewBox="0 0 87 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
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
