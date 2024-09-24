import { Button } from 'antd'
import { useDispatch } from 'react-redux'

import { setStageProgressAsReady } from '../../../../store/reducers/EmploymentProgressSlice'

export const EmplMedInvite = (props: {
	respondId: number
	stageId: number
	stageName: string
}) => {
	const dispatch = useDispatch()

	return (
		<Button
			type="primary"
			className="rounded-[54.5px]"
			onClick={() => {
				dispatch(setStageProgressAsReady(props.stageId))
			}}
		>
			Получить направление
		</Button>
	)
}
