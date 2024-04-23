import { useState } from 'react'
import { FormingSchedule } from './FormingSchedule'
import PracticeSchedule from './PracticeSchedule'


export const Schedule = () => {
	const [isCreate, setIsCreate] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	const [isFinalReview, setIsFinalReview] = useState(false)
	if (isCreate) return <FormingSchedule setIsCreate={setIsCreate} />

	return (
		<PracticeSchedule
			setIsCreate={setIsCreate}
			setIsPreview={setIsPreview}
			setIsFinalReview={setIsFinalReview}
		/>
	)
}
