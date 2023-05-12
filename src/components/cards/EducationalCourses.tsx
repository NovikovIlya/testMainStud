import { Button, Carousel } from 'antd'

import img from '../../assets/images/educationalCourses.png'

import { educationalCourses, next, prev } from './const'

export const EducationalCourses = () => {
	return (
		<div className="px-[52px] mt-[40px]">
			<div className="font-semibold text-2xl text-start">
				Образовательные курсы
			</div>
			<div>
				<Carousel
					className="h-[80px]  mt-[31px] text-start"
					arrows
					prevArrow={prev}
					nextArrow={next}
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
