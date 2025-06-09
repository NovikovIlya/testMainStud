import { Button } from 'antd'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { SessionProps } from '../../models/cards'
import { LinkOutlined } from '@ant-design/icons'


export const TemplateCard = ({isLink,className,href,img,info,title,height = 112,width = 112,buttonText = 'Watch',mt = 'mt-3',positionImage,isRounded,buttonType = 'default'}: SessionProps) => {
	const { t } = useTranslation()

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	return (
		<div onClick={()=>{
			if(isMobile){
				window.open(href)
			}
		}} className="transform transition hover:scale-[101%]  duration-300 hover:shadow-lg  shadow-md flex w-full bg-white rounded-3xl sm:h-[320px] flex-col px-7 py-8 justify-between h-full max-[874px]:p-0 max-[874px]:py-3 max-[874px]:items-center ">
			<div className={` flex ${isMobile ? 'flex-wrap' : ''} max-[874px]:flex-col max-[874px]:h-full max-[874px]:w-full max-[874px]:items-center h-full `}>
				<div className="!w-[100%]  text-left ">
						<div className="text-[10px] sm:leading-7 md:text-xl font-bold sm:whitespace-nowrap h-10">
						{t(title)}
					</div>
					<div className="hidden sm:block text-xs sm:text-base w-[84%] font-normal leading-relaxed mt-7 max-[870px]:hidden">
						{t(info)}
					</div>
				</div>
				{img && (
					<div
					 className="h-[60px] sm:h-auto w-full flex sm:w-60 justify-center sm:justify-end  max-[874px] max-[874px]:w-full max-[874px]:items-center"
					 >
						<div
							className={`${isMobile ? 'hidden' : ''} bg-[#3E89F9] bg-opacity-80 w-[50px] sm:w-[125px] h-[50px] sm:h-[125px] rounded-full absolute -z-10 ${mt}`}
						/>
						<img
							src={img}
							width={isMobile ? '50px' : width}
							height={isMobile ? '60px' : height}
							alt=""
							className={clsx(
								'rounded-full',
								isRounded ? 'rounded-full' : 'rounded-3xl',
								`${positionImage}`,
								`${isMobile ? '!mt-0' : ''}`
							)}
						/>
					</div>
				)}
			</div>

			{isMobile ? '' : <Button
				type={buttonType}
				href={href}
				className="rounded-full w-[200px] h-[50px] max-[874px]:absolute  max-[874px]:bottom-5 flex items-center justify-center no-underline"
			>
			{isLink ? <LinkOutlined className='' /> :''}	{t(buttonText)}
			</Button>}
		</div>
	)
}
