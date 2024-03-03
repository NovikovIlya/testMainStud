import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/image44.png'

export const Seeker = () => {
	const navigate = useNavigate()

	return (
		<div
			className="py-10 pl-10 max-xl:p-5 max-md:p-10 flex w-full h-full max-[560px]:flex-col rounded-[20px] text-white max-md:justify-center"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="flex flex-col h-full justify-between w-full  max-w-sm max-md:justify-center max-md:gap-5">
				<span className="bg-none text-4xl font-bold text-start max-[560px]:text-center max-xl:text-3xl max-md:text-2xl">
					Schedule
				</span>
				<p className="w-[380px] ">Инженер-программист</p>
				<p>Медицинская сестра</p>
			</div>
			<div className="flex max-xl:hidden items-center justify-center w-full">
				<div className="bg-white rounded-full w-44 h-44  absolute"></div>
				<img
					src={img}
					alt=""
					width={'160px'}
					height={'163px'}
					className="ml-6 mt-4 mb-2 bottom-[40px] z-10"
				/>
			</div>
			<div
				className="flex max-xl:hidden w-fit justify-center items-center "
				onClick={() => navigate('/services/jobseeker/catalog')}
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
