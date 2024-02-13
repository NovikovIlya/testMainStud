import React, { useState } from 'react'

import CreateTask from './CreateTask'
import IndividualTasks from './IndividualTasks'

export const Tasks = () => {
	const [isCreate, setIsCreate] = useState(false)
	if (isCreate) return <CreateTask setIsCreate={setIsCreate} />
	else return <IndividualTasks setIsCreate={setIsCreate} />
}
