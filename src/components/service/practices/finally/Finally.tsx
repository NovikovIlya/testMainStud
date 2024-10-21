
import {useLocation} from "react-router-dom";


import CreateFinally from "./CreateFinally";
import EditFinnaly from "./EditFinnaly";
import {ViewFinally} from "./ViewFinally";
import ViewPraciceTeacher from "./ViewPracticeTeacher";



export const Finally = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createAppendix')) {
		return < CreateFinally/>
	}  else if (pathname.includes('edit')){
		return <ViewPraciceTeacher/>
	}else {
		return <ViewFinally/>
	}
}
