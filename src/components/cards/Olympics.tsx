import { Button, Carousel } from 'antd'
import { useRef } from 'react'

import img from '../../assets/images/olympics.png'

import { NextSvg, PrevSvg, olympic } from './const'

export const Olympics = () => {
	const slider = useRef() as React.MutableRefObject<any>

	const olympics = olympic.map((item, index) => (
		<div key={index}>
			<div>
				<div>
					<strong>Предмет: </strong>
					{item.item}
				</div>
				<div>
					<strong>Дата: </strong>
					{item.date}
				</div>
				<div>
					<strong>Кому: </strong>
					{item.whom}
				</div>
			</div>
		</div>
	))
	return (
		<div className="px-[80px] mt-[40px]">
			<div>
				<div className="font-semibold text-xl text-start">Олимпиады</div>
			</div>
			<div
				onClick={() => slider.current.prev()}
				className="absolute cursor-pointer left-[32px] top-[147px]"
			>
				<PrevSvg />
			</div>
			<Carousel
				className=" w-[270px] mt-[30px] text-start"
				ref={slider}
				dots={false}
			>
				{olympics}
			</Carousel>
			<div
				onClick={() => slider.current.next()}
				className="absolute cursor-pointer top-[147px] right-[32px]"
			>
				<NextSvg />
			</div>
			<div className="text-start absolute bottom-[40px]">
				<Button
					type="primary"
					className="rounded-full w-[200px] h-[50px] text-base font-semibold mt-[52px]"
				>
					Записаться
				</Button>
			</div>
			<div className="min-w-[125px] absolute min-h-[125px] right-[55px] z-10 top-[50px] max-h-[125px] max-w-[125px] bg-opacity-80 bg-[#3E89F9] rounded-full">
				<img className="rounded-b-full -mt-[5px]" src={img} alt="" />
			</div>
		</div>
	)
}
