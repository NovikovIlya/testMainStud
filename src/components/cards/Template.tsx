import { Button } from 'antd'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

type SessionProps = {
	title: string
	info: string
	href: string
	img?: string
	width?: number
	height?: number
	buttonText?: string
	buttonType?: 'link' | 'text' | 'default' | 'primary' | 'dashed' | undefined
	mt?: string
	positionImage?: string
	isRounded?: boolean
}

export const TemplateCard = ({
	href,
	img,
	info,
	title,
	height = 112,
	width = 112,
	buttonText = 'Посмотреть',
	mt = 'mt-3',
	positionImage,
	isRounded,
	buttonType = 'default'
}: SessionProps) => {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col px-7 py-8 justify-between h-full max-[874px]:p-0 max-[874px]:py-3 max-[874px]:items-center ">
			<div className="flex max-[874px]:flex-col max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
				<div className="text-left">
					<div className="leading-7 text-xl font-bold whitespace-nowrap">
						{title}
					</div>
					<div className="text-base font-normal leading-relaxed mt-7 max-[874px]:hidden">
						{info}
					</div>
				</div>
				{img && (
					<div className="w-60 justify-center flex max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
						<div
							className={`bg-[#3E89F9] bg-opacity-80 w-[125px] h-[125px] rounded-full absolute -z-10 ${mt}`}
						/>
						<img
							src={img}
							width={width}
							height={height}
							alt=""
							className={clsx(positionImage, isRounded && 'rounded-full')}
						/>
					</div>
				)}
			</div>
			{href.includes('http') ? (
				<Button
					type={buttonType}
					className="rounded-full w-[200px] h-[50px] max-[874px]:hidden"
					onClick={() => {
						window.open(href)
					}}
				>
					{buttonText}
				</Button>
			) : (
				<Button
					type={buttonType}
					className="rounded-full w-[200px] h-[50px] max-[874px]:hidden"
					onClick={() => {
						navigate(href)
					}}
				>
					{buttonText}
				</Button>
			)}
		</div>
	)
}
