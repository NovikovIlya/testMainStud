import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import CreateTask from './CreateTask'
import EditTask from './EditTask'
import IndividualTasks from './IndividualTasks'

export const Tasks = () => {
	const [edit, setEdit] = useState('')
	const { pathname } = useLocation()
	if (pathname.includes('createTask')) return <CreateTask />
	else if (edit !== '') return <EditTask edit={edit} setEdit={setEdit} />
	else return <IndividualTasks setEdit={setEdit} />
}
