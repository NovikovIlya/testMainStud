import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'
import React from "react";

export const EmplInstruction = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(stage => stage.type === props.stageName)
	const dispatch = useDispatch()

	return (
		<>
			<div className="font-content-font font-normal text-black text-[16px]/[19.2px] flex flex-col">
				<div className="flex flex-col gap-[12px]">
					<span className="font-content-font font-normal text-black text-[16px]/[19.2px]">Посмотрите видео-инструктаж, а затем пройдите тест</span>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center">
						<iframe width="100%" height="100%"
								src="https://rutube.ru/play/embed/96127725cc229372ae2e5c52fd398d49/"
								frameBorder="0"
								allow="clipboard-write; autoplay"
								webkitAllowFullScreen
								mozallowfullscreen
								allowFullScreen>
						</iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center">
						<iframe width="100%" height="100%"
								src="https://rutube.ru/play/embed/96127725cc229372ae2e5c52fd398d49/"
								frameBorder="0"
								allow="clipboard-write; autoplay"
								webkitAllowFullScreen
								mozallowfullscreen
								allowFullScreen>
						</iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center">
						<iframe width="100%" height="100%"
								src="https://rutube.ru/play/embed/96127725cc229372ae2e5c52fd398d49/"
								frameBorder="0"
								allow="clipboard-write; autoplay"
								webkitAllowFullScreen
								mozallowfullscreen
								allowFullScreen>
						</iframe>
					</div>
					<div className="overflow-hidden rounded-2xl w-[730px] h-[400px] items-center">
						<iframe width="100%" height="100%"
								src="https://rutube.ru/play/embed/96127725cc229372ae2e5c52fd398d49/"
								frameBorder="0"
								allow="clipboard-write; autoplay"
								webkitAllowFullScreen
								mozallowfullscreen
								allowFullScreen>
						</iframe>
					</div>
				</div>
				<Button
					type="link"
					className="mt-[40px] w-[131px] bg-dasha-blue text-white no-underline rounded-[54.5px]"
					href={foundStage?.testLink}
					target="_blank"
				>
					Пройти тест
				</Button>
				<Button
					type="primary"
					className="rounded-[54.5px] mt-[40px] w-[131px]"
					onClick={() => {
						dispatch(setStageProgressAsReady(props.stageId))
					}}
				>
					Я прошёл тест
				</Button>
			</div>
		</>
	)
}
