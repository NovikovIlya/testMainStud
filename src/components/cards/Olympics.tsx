import { Button, Carousel } from 'antd'

import img from '../../assets/images/olympics.png'

import { next, olympics, prev } from './const'

export const Olympics = () => {
	return (
		<div className="px-[52px] mt-[40px]">
			<div>
				<div className="font-semibold text-2xl text-start">Олимпиады</div>
			</div>
			<div className="min-w-[125px] absolute min-h-[125px] right-[55px] z-10 top-[50px] max-h-[125px] max-w-[125px] bg-[#3E89F9] rounded-full">
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
			<div className="text-start absolute bottom-[40px]">
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
