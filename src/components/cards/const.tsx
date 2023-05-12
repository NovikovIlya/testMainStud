import { Divider } from 'antd'

export const olympics = [
	<div>
		<div>
			<div>
				<strong>Предмет:</strong> Физика
			</div>
			<div>
				<strong>Дата:</strong> 24.03.2024
			</div>
			<div>
				<strong>Кому:</strong> Студенты 2 курса
			</div>
		</div>
	</div>,
	<div>
		<div>
			<div>
				<strong>Предмет:</strong> Физика
			</div>
			<div>
				<strong>Дата:</strong> 24.03.2024
			</div>
			<div>
				<strong>Кому:</strong> Студенты 2 курса
			</div>
		</div>
	</div>
]
export const events = [
	<div className="text-start  flex gap-[8px]">
		<div className="text-base w-max">День открытых дверей ИВМиИТ</div>
		<Divider className="border-black flex-1  m-0 mt-4 min-w-fit" dashed />
		<div className="text-base font-semibold text-[#3073D7]">24.09.2023</div>
	</div>,
	<div className="text-start  flex gap-[8px]">
		<div className="text-base w-max">День открытых дверей ИФМ</div>
		<Divider className="border-black   m-0 mt-4 flex-1 min-w-fit" dashed />

		<div className="text-base font-semibold text-[#3073D7]">26.09.2023</div>
	</div>
]

export const educationalCourses = [
	<div>
		<div className="flex items-center justify-between mr-[280px]">
			<div className="text-base ">Облачные технологии в образовании</div>
			<div className="text-[#3073D7] text-xl flex">
				<span>30</span>
				<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
				<div className="text-xl">10 000 руб.</div>
			</div>
		</div>
		<Divider dashed className="border-black w-[716px] my-[20px]" />
		<div className="flex items-center justify-between mr-[280px]">
			<div className="text-base ">Облачные технологии в образовании</div>
			<div className="text-[#3073D7] text-xl flex">
				<span>30</span>
				<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
				<div className="text-xl">10 000 руб.</div>
			</div>
		</div>
	</div>,
	<div>
		<div className="flex items-center justify-between mr-[280px]">
			<div className="text-base ">Облачные технологии в образовании</div>
			<div className="text-[#3073D7] text-xl flex">
				<span>30</span>
				<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
				<div className="text-xl">10 000 руб.</div>
			</div>
		</div>
		<Divider dashed className="border-black w-[716px] my-[20px]" />
		<div className="flex items-center justify-between mr-[280px]">
			<div className="text-base ">Облачные технологии в образовании</div>
			<div className="text-[#3073D7] text-xl flex">
				<span>30</span>
				<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
				<div className="text-xl">10 000 руб.</div>
			</div>
		</div>
	</div>
]
export const prev = (
	<svg
		width="14"
		height="33"
		viewBox="0 0 14 33"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.5 0.972656L2.19501 16.5523L12.5 31.4067"
			stroke="black"
			strokeWidth="3"
			strokeLinejoin="round"
		/>
	</svg>
)
export const next = (
	<svg
		width="14"
		height="33"
		viewBox="0 0 14 33"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M1.5 0.972656L11.805 16.5523L1.5 31.4067"
			stroke="black"
			strokeWidth="3"
			strokeLinejoin="round"
		/>
	</svg>
)
