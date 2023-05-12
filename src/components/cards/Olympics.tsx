import { Button, Carousel } from 'antd'

import img from '../../assets/images/olympics.png'

import { olympics } from './const'

export const Olympics = () => {
	return (
		<div className="px-[52px] mt-[40px]">
			<div>
				<div className="font-semibold text-2xl text-start">Олимпиады</div>
			</div>
			<div className="min-w-[125px] absolute min-h-[125px] right-[55px] top-[50px] max-h-[125px] max-w-[125px] bg-[#3E89F9] rounded-full">
				<img className="rounded-b-full -mt-[5px]" src={img} alt="" />
			</div>
			<Carousel
				className="h-[80px]  mt-[31px] text-start"
				arrows
				prevArrow={prev}
				nextArrow={next}
			>
				{olympics}
			</Carousel>
			<div className="text-start">
				<Button
					type="primary"
					className="rounded-full w-[200px] h-[50px] text-base font-semibold mt-[52px]"
				>
					Записаться
				</Button>
			</div>
		</div>
	)
}
const prev = (
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
const next = (
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
