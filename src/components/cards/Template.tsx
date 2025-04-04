import { Button } from 'antd'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { SessionProps } from '../../models/cards'
import { LinkOutlined } from '@ant-design/icons'


export const TemplateCard = ({isLink,className,href,img,info,title,height = 112,width = 112,buttonText = 'Watch',mt = 'mt-3',positionImage,isRounded,buttonType = 'default'}: SessionProps) => {
	const { t } = useTranslation()

	return (
		<div className="transform transition hover:scale-[101%]  duration-300 hover:shadow-lg  shadow-md flex w-full bg-white rounded-3xl h-[320px] flex-col px-7 py-8 justify-between h-full max-[874px]:p-0 max-[874px]:py-3 max-[874px]:items-center ">
			<div className="flex max-[874px]:flex-col max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
				<div className="text-left">
						<div className="leading-7 text-xl font-bold whitespace-nowrap">
						{t(title)}
					</div>
					<div className="text-base w-[84%] font-normal leading-relaxed mt-7 max-[870px]:hidden">
						{t(info)}
					</div>
				</div>
				{img && (
					<div className="w-60 justify-end flex max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center">
						<div
							className={`bg-[#3E89F9] bg-opacity-80 w-[125px] h-[125px] rounded-full absolute -z-10 ${mt}`}
						/>
						<img
							src={img}
							width={width}
							height={height}
							alt=""
							className={clsx(className,positionImage, isRounded && 'rounded-full')}
						/>
					</div>
				)}
			</div>

			<Button
				type={buttonType}
				href={href}
				className="rounded-full w-[200px] h-[50px] max-[874px]:absolute  max-[874px]:bottom-5 flex items-center justify-center no-underline"
			>
			{isLink ? <LinkOutlined className='' /> :''}	{t(buttonText)}
			</Button>
		</div>
	)
}
