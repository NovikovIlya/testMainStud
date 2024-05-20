import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import CreateTask from './createTask/CreateTask'
import EditTask from './EditTask'
import IndividualTasks from './IndividualTasks'

export const Tasks = () => {
	const [edit, setEdit] = useState('')
	const { pathname } = useLocation()
	if (pathname.includes('createTask')) {
		return <CreateTask/>
	} else if (pathname.includes('editTask')) {
		return <EditTask/>
	}
	else {
		return <IndividualTasks/>
	}
}
