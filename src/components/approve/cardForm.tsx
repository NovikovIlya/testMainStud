import { Button } from 'antd'
import { AllHTMLAttributes, FC } from 'react'

import { CloseSvg } from '../../assets/svg'

interface cardProps {
	buttonEffect: () => void
	closeEffect: () => void
	withDots: boolean
	mainTittle: string
	secondTittle: AllHTMLAttributes<HTMLSpanElement>
	buttonText: string
	buttonBgBlue: boolean
}

export const CardForm: FC<cardProps> = ({
	buttonEffect,
	closeEffect,
	withDots,
	mainTittle,
	secondTittle,
	buttonText,
	buttonBgBlue
}) => {
	return (
		<div className="w-screen h-screen">
			<div
				className="w-full h-[600px] rounded-3xl border-[1px] fixed left-0 right-0 top-0 bottom-0 m-auto border-bluekfu border-solid
      md:w-[768px] sm:w-[640px] sm:h-[380px] flex flex-col justify-around"
			>
				<span className="flex justify-end">
					<span className="cursor-pointer mr-[20px]" onClick={closeEffect}>
						<CloseSvg />
					</span>
				</span>
				<h2 className="flex justify-center">{mainTittle}</h2>
				{withDots && (
					<span className="flex justify-center">
						<span className="w-[20px] h-[20px] bg-bluekfu rounded-full mr-2"></span>
						<span className="w-[20px] h-[20px] bg-bluekfu rounded-full mr-2"></span>
						<span className="w-[20px] h-[20px] bg-bluekfu rounded-full mr-2"></span>
						<span className="w-[20px] h-[20px] bg-bluekfu rounded-full mr-2"></span>
					</span>
				)}
				<h4 className="mt-[20px] mb-[20px] w-4/6 text-center mx-auto flex font-normal">
					<>{secondTittle}</>
				</h4>
				<div className="flex justify-center">
					{!buttonBgBlue && (
						<Button
							className="rounded-md border-bluekfu border-[1px] border-solid text-bluekfu font-bold w-1/3 h-[56px] text-center"
							onClick={buttonEffect}
						>
							{buttonText}
						</Button>
					)}
					{buttonBgBlue && (
						<Button
							className="rounded-md bg-bluekfu text-white font-bold w-1/3 h-[56px] text-center hover:bg-white"
							onClick={buttonEffect}
						>
							{buttonText}
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
