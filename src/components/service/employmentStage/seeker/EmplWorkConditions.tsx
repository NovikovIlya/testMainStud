import { Checkbox } from 'antd'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import {
	setStageProgressAsFilling,
	setStageProgressAsReady
} from '../../../../store/reducers/EmploymentProgressSlice'

export const EmplWorkConditions = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const { stages } = useAppSelector(state => state.employmentProgress)
	const progress = stages.find(stage => stage.id === props.stageId)
	const dispatch = useDispatch()

	return (
		<>
			<div>
				<Checkbox
					checked={progress?.status === 'READY'}
					onChange={e => {
						e.target.checked
							? dispatch(setStageProgressAsReady(props.stageId))
							: dispatch(setStageProgressAsFilling(props.stageId))
					}}
				>
					Я ознакомлен с трудовыми условиями
				</Checkbox>
			</div>
		</>
	)
}
