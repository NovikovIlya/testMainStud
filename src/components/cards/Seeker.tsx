import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/image44.png'
import {
	keepFilterCategory,
	keepFilterSubCategory,
	keepFilterType
} from '../../store/reducers/CatalogFilterSlice'

export const Seeker = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<div
			className="py-10 pl-10 max-xl:p-5 max-md:p-10 flex w-full h-full max-[560px]:flex-col rounded-[20px] text-white max-md:justify-center"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="flex flex-col h-full justify-between w-full  max-w-sm max-md:justify-center max-md:gap-5">
				<span className="bg-none text-4xl font-bold text-start max-[560px]:text-center max-xl:text-3xl max-md:text-2xl">
					Вакансии
				</span>
				<div className="flex justify-between w-[720px] border-dashed border-white border-0 border-b-2 pb-[20px]">
					<p className="font-main-font font-normal text-[16px]/[28px]">
						Инженер-программист
					</p>
					<p className="font-main-font font-bold text-[16px]/[28px]">
						от 300 000 р.
					</p>
				</div>
				<div className="flex justify-between w-[720px] border-dashed border-white border-0 border-b-2 pb-[20px]">
					<p className="font-main-font font-normal text-[16px]/[28px]">
						Медицинская сестра
					</p>
					<p className="font-main-font font-bold text-[16px]/[28px]">
						от 100 000 р.
					</p>
				</div>
			</div>
			<div className="ml-[20%] flex max-[560px]:hidden items-center justify-center w-full">
				<div className="bg-white rounded-full w-[256px] h-[245px]  absolute"></div>
				<img
					src={img}
					alt=""
					width={'231px'}
					height={'233px'}
					className="ml-6 mt-4 mb-2 bottom-[40px] z-10"
				/>
			</div>
			<div
				className="flex w-fit max-[560px]:w-full justify-center items-center mr-[5%]"
				onClick={() => {
					dispatch(keepFilterCategory('АУП'))
					dispatch(keepFilterSubCategory('Все'))
					dispatch(keepFilterType('DIRECTORY'))
					navigate('/services/jobseeker/catalog')
				}}
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
