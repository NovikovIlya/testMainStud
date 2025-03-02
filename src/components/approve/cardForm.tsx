import { Button } from 'antd'
import { FC } from 'react'

import { CloseSvg } from '../../assets/svg'
import { cardProps } from '../../models/approve'

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
		<>
			<div className="w-screen h-screen bg-[#666666] ">
				<div
					className="bg-white w-full shadow-lg h-[600px] rounded-3xl  fixed left-0 right-0 top-0 bottom-0 m-auto  
      md:w-[768px] sm:w-[640px] sm:h-[380px] flex flex-col justify-center gap-2"
				>
					<h2 className="flex justify-center">{mainTittle}</h2>

					{withDots && (
						<span className="flex justify-center mt-2">
							<span className="w-[20px] h-[20px] bg-sky-700 rounded-full mr-2"></span>
							<span className="w-[20px] h-[20px] bg-sky-700 rounded-full mr-2"></span>
							<span className="w-[20px] h-[20px] bg-sky-700 rounded-full mr-2"></span>
							<span className="w-[20px] h-[20px] bg-sky-700 rounded-full mr-2"></span>
						</span>
					)}

					<h4 className="mt-[20px] mb-[20px] w-4/6 text-center mx-auto flex font-normal">
						<>{secondTittle}</>
					</h4>
					<div className="flex justify-center">
						{!buttonBgBlue && (
							<Button
								type='primary'
								className="rounded-md border-bluekfu border-[1px] border-solid  font-bold w-1/3 h-[56px] text-center"
								onClick={buttonEffect}
							>
								{buttonText}
							</Button>
						)}
						{buttonBgBlue && (
							// <Button
							// 	type='primary'
							// 	className="rounded-md bg-bluekfu  font-bold w-1/3 h-[56px] text-center "
							// 	onClick={buttonEffect}
							// >
							// 	{buttonText}
							// </Button>
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
