import React, { useState } from 'react'

import { CreateContracts } from './CreateContracts'
import { FinalPreview } from './FinalPreview'
import { PreviewContracts } from './PreviewContracts'
import { RegisterContracts } from './RegisterContracts'

export const Roster = () => {
	const [isCreate, setIsCreate] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	const [isFinalReview, setIsFinalReview] = useState(false)
	if (isFinalReview) return <FinalPreview setIsFinalReview={setIsFinalReview} />
	if (isPreview)
		return (
			<PreviewContracts
				setIsPreview={setIsPreview}
				setIsCreate={setIsCreate}
				setIsFinalReview={setIsFinalReview}
			/>
		)
	if (isCreate)
		return (
			<CreateContracts setIsCreate={setIsCreate} setIsPreview={setIsPreview} />
		)

	return (
		<RegisterContracts
			setIsCreate={setIsCreate}
			setIsPreview={setIsPreview}
			setIsFinalReview={setIsFinalReview}
		/>
	)
}
