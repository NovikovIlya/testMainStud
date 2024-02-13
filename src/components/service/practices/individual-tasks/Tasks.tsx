import { useLocation } from 'react-router-dom'

import CreateTask from './CreateTask'
import IndividualTasks from './IndividualTasks'

export const Tasks = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createTask')) return <CreateTask />
	else return <IndividualTasks />
}
