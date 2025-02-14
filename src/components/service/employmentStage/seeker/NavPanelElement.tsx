import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { EmpReadyIcon } from '../../../../assets/svg/EmpReadyIcon'
import { useAppSelector } from '../../../../store'
import { setStage } from '../../../../store/reducers/CurrentEmploymentStage'

export const NavPanelElement = (props: { id: number; text: string }) => {
	const dispatch = useDispatch()
	const { stages } = useAppSelector(state => state.employmentProgress)
	const { currentStage } = useAppSelector(state => state.currentEmploymentStage)
	const progress = stages.find(stage => stage.id === props.id)

	const [isReadyToSend, setIsReadyToSend] = useState<boolean>(false)
	const [isBeingVerified, setIsBeingVerified] = useState<boolean>(false)

	useEffect(() => {
		if (progress === undefined) {
			const verifying = stages.find(stage => stage.status === 'VERIFYING' || stage.status === 'ACCEPTED')
			const refining = stages.find(stage => stage.status === 'REFINE' || stage.status === 'READY')
			const notReady = stages.find(stage => stage.status === 'FILLING' || stage.status === 'REFINE')

			if (verifying && !refining) {
				setIsBeingVerified(true)
				return
			}

			if (notReady) {
				setIsReadyToSend(false)
			} else {
				setIsReadyToSend(true)
			}
		}
	}, [stages])

	if (progress === undefined) {
		if (isBeingVerified) {
			return (
				<>
					<div
						className="flex flex-col items-center gap-[12px] h-full z-[3] w-[10%] font-content-font font-bold text-[14px]/[14px] cursor-pointer select-none"
						onClick={() => {
							dispatch(setStage(props.id))
						}}
					>
						<div className="h-[28px] w-[28px] relative">
							<div className="absolute h-[28px] w-[28px] bg-[#F5F8FB] z-[5]"></div>
							<div className="absolute h-[28px] w-[28px] bg-inherit z-[6] opacity-50">
								<EmpReadyIcon />
							</div>
						</div>
						<div className="text-[#3073D7] text-center">{props.text}</div>
					</div>
				</>
			)
		}

		return (
			<div
				className={`flex flex-col items-center gap-[12px] h-full z-[3] w-[10%] font-content-font font-bold text-[14px]/[14px] ${
					isReadyToSend ? 'cursor-pointer' : 'cursor-not-allowed'
				} select-none`}
				onClick={() => {
					isReadyToSend && dispatch(setStage(props.id))
				}}
			>
				<>
					<div
						className={`shrink-0 h-[28px] w-[28px] rounded-[32px] border-solid border-2 ${
							currentStage === props.id ? 'text-[#3073D7] border-[#3073D7]' : 'text-[#757778] border-[#757778]'
						} flex justify-center items-center bg-[#F5F8FB]`}
					>
						{props.id - 1}
					</div>
					<div className={`${currentStage === props.id ? 'text-[#3073D7]' : 'text-[#757778]'}  text-center`}>
						{props.text}
					</div>
				</>
			</div>
		)
	}

	return (
		<div
			className="flex flex-col items-center gap-[12px] h-full z-[3] w-[10%] font-content-font font-bold text-[14px]/[14px] cursor-pointer select-none"
			onClick={() => {
				dispatch(setStage(props.id))
			}}
		>
			{progress.status === 'FILLING' || progress.status === 'REFINE' ? (
				<>
					<div
						className={`shrink-0 h-[28px] w-[28px] rounded-[32px] border-solid border-2 ${
							currentStage === props.id ? 'text-[#3073D7] border-[#3073D7]' : 'text-[#757778] border-[#757778]'
						} flex justify-center items-center bg-[#F5F8FB]`}
					>
						{props.id - 1}
					</div>
					<div className={`${currentStage === props.id ? 'text-[#3073D7]' : 'text-[#757778]'}  text-center`}>
						{props.text}
					</div>
				</>
			) : progress.status === 'VERIFYING' || progress.status === 'ACCEPTED' ? (
				<>
					<div className="h-[28px] w-[28px] relative">
						<div className="absolute h-[28px] w-[28px] bg-[#F5F8FB] z-[5]"></div>
						<div className="absolute h-[28px] w-[28px] bg-inherit z-[6] opacity-50">
							<EmpReadyIcon />
						</div>
					</div>
					<div className="text-[#3073D7] text-center">{props.text}</div>
				</>
			) : (
				<>
					<div className="h-[28px] w-[28px]">
						<EmpReadyIcon />
					</div>
					<div className="text-[#3073D7] text-center">{props.text}</div>
				</>
			)}
		</div>
	)
}
