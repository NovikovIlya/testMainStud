import { Button, Carousel, Divider } from 'antd'

import img from '../../assets/images/educationalCourses.png'

import { NextSvg, PrevSvg, educationalCourse } from './const'

export const EducationalCourses = () => {
	const educationalCourses = educationalCourse.map((item, index) => (
		<div key={index}>
			<div className="flex items-center justify-between mr-[280px]">
				<div className="text-base ">{item.titleUp}</div>
				<div className="text-[#3073D7] text-xl flex">
					<span>{item.hourUp}</span>
					<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
					<div className="text-xl">{item.priceUp}.</div>
				</div>
			</div>
			<Divider
				dashed
				className="border-black max-w-[716px] w-[716px] my-[20px]"
			/>
			<div className="flex items-center justify-between mr-[280px]">
				<div className="text-base ">{item.titleUp}</div>
				<div className="text-[#3073D7] text-xl flex">
					<span>{item.hourUp}</span>
					<Divider type="vertical" className="border-[#3073D7] border-1 m-2" />
					<div className="text-xl">{item.priceDown}</div>
				</div>
			</div>
		</div>
	))
	return (
		<div className="px-[52px] mt-[40px]">
			<div className="font-semibold text-2xl text-start">
				Образовательные курсы
			</div>
			<div>
				<Carousel
					className="h-[80px]  mt-[31px] text-start"
					arrows
					prevArrow={<PrevSvg />}
					nextArrow={<NextSvg />}
				>
					{educationalCourses}
				</Carousel>
			</div>
			<div className="min-w-[125px] min-h-[125px] absolute right-[70px] top-[80px] max-h-[125px] bg-[#3E89F9] rounded-full">
				<img className="rounded-b-full -mt-[15px]" src={img} alt="" />
			</div>
			<div className="flex absolute gap-[365px] items-center bottom-[40px]">
				<Button
					type="primary"
					className="rounded-full w-[200px]  h-[50px] text-base font-semibold "
				>
					Записаться
				</Button>
				<div className="text-base font-bold text-[#3073D7]">
					#доп_образование
				</div>
			</div>
		</div>
	)
}
