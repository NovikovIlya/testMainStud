import React, { useState } from 'react'

import { CreateContracts } from './CreateContracts'
import { PreviewContracts } from './PreviewContracts'
import { RegisterContracts } from './RegisterContracts'

export const Roster = () => {
	const [isCreate, setIsCreate] = useState(false)
	const [isPreview, setIsPreview] = useState(false)
	if (isCreate) return <CreateContracts setIsCreate={setIsCreate} />
	if (isPreview)
		return (
			<PreviewContracts setIsPreview={setIsPreview} setIsCreate={setIsCreate} />
		)
	return (
		<RegisterContracts setIsCreate={setIsCreate} setIsPreview={setIsPreview} />
	)
}
