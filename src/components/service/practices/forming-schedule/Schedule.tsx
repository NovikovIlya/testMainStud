import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { FormingSchedule } from './FormingSchedule'
import PracticeSchedule from './PracticeSchedule'
import ViewDocument from './ViewDocument'
import ViewSchedule from './ViewSchedule'

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
