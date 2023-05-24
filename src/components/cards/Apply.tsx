import { Button } from 'antd'

import img from '../../assets/images/avatar.png'

export const Apply = () => {
	return (
		<div
			className="h-[340px] rounded-[1vw] w-full pl-[50px] flex"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div>
				<div className="text-[42px] uppercase text-white w-fit font-extrabold  mt-[62px]">
					Подать заявление
				</div>
				<div className="mt-[40px] text-white">
					<Button className="w-[203px] shadow-lg font-bold h-[62px] text-2xl">
						Бакалавриат
					</Button>
					<Button
						type="text"
						className="w-[203px] shadow-lg text-white font-bold h-[62px] text-2xl ml-[50px]"
					>
						Магистратура
					</Button>
					<Button
						type="text"
						className="w-[203px] shadow-lg text-white font-bold h-[62px] text-2xl ml-[50px]"
					>
						Аспирантура
					</Button>
					<Button
						type="text"
						className="w-[203px] shadow-lg text-white font-bold h-[62px] text-2xl ml-[50px]"
					>
						Ординатура
					</Button>
				</div>
			</div>
			<div>
				<img
					className="rounded-full absolute right-[200px] -top-[150px]"
					src={img}
					alt="avatar"
				/>
			</div>
			<div className="absolute right-[108px] h-full flex items-center">
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
