import {useLocation} from 'react-router-dom'
import {CreatePractical} from './CreatePractical'
import {ViewPractical} from './ViewPractical'
import {EditPractical} from "./EditPractical";

export const Practical = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createPractical')) {
		return <CreatePractical/>
	} else if (pathname.includes('editPractical')){
		return <EditPractical/>
	} else {
		return <ViewPractical/>
	}
}
