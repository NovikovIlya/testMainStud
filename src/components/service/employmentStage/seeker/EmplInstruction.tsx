import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

export const EmplInstruction = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const { empData } = useAppSelector(state => state.employmentData)
	const foundStage = empData.stages.find(
		stage => stage.type === props.stageName
	)
	const dispatch = useDispatch()

	return (
		<>
			<div className="font-content-font font-normal text-black text-[16px]/[19.2px] flex flex-col">
				<div className="flex flex-col gap-[12px]">
					<p>Посмотрите видео-инструктаж</p>
					<video
						src="\public\employment-instruction.mp4"
						controls
						className="w-[50%] rounded-[16px]"
					></video>
					<video
						src="\public\employment-instruction.mp4"
						controls
						className="w-[50%] rounded-[16px]"
					></video>
					<video
						src="\public\employment-instruction.mp4"
						controls
						className="w-[50%] rounded-[16px]"
					></video>
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
