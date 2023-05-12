import { Button } from 'antd'

import img from '../../assets/images/avatar.png'

export const Apply = () => {
	return (
		<div className="h-[320px] w-full ml-[50px] flex">
			<div>
				<div className="text-[42px] w-fit font-bold  mt-[62px]">
					Подать заявление
				</div>
				<div className="mt-[40px]">
					<Button className="w-[203px] font-bold h-[62px] border-black text-2xl">
						Бакалавриат
					</Button>
					<Button
						type="text"
						className="w-[203px] font-bold h-[62px] text-2xl ml-[50px]"
					>
						Магистратура
					</Button>
					<Button
						type="text"
						className="w-[203px] font-bold h-[62px] text-2xl ml-[50px]"
					>
						Аспирантура
					</Button>
					<Button
						type="text"
						className="w-[203px] font-bold h-[62px] text-2xl ml-[50px]"
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
					width="64"
					height="34"
					viewBox="0 0 64 34"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M0 17.3609L61.5755 17.3609M61.5755 17.3609L51.2705 1.78125M61.5755 17.3609L51.2705 32.2153"
						stroke="black"
						strokeWidth="3"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
		</div>
	)
}
