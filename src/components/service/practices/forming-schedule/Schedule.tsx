import { FormingSchedule } from './FormingSchedule'
import PracticeSchedule from './PracticeSchedule'
import {useLocation} from "react-router-dom";


export const Schedule = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createSchedule')) {
		return <FormingSchedule />
	} else {
		return <PracticeSchedule/>
	}
}
