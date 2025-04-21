import { Checkbox } from 'antd'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { useAgreeToWorkingConditionsMutation } from '../../../../store/api/serviceApi'
import { setStageProgressAsFilling, setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

export const EmplWorkConditions = (props: { respondId: number; stageId: number; stageName: string }) => {
	const { stages } = useAppSelector(state => state.employmentProgress)
	const progress = stages.find(stage => stage.type === props.stageName)
	const dispatch = useDispatch()

	const [agree] = useAgreeToWorkingConditionsMutation()

	return (
		<>
			<div>
				<Checkbox
					checked={progress?.status === 'READY'}
					onChange={e => {
						e.target.checked
							? agree(props.respondId).then(() => {
									dispatch(setStageProgressAsReady(props.stageName))
							  })
							: dispatch(setStageProgressAsFilling(props.stageName))
					}}
				>
					Я ознакомлен с трудовыми условиями
				</Checkbox>
			</div>
		</>
	)
}
