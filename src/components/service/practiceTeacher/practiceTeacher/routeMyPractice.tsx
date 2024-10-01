
import {useLocation} from "react-router-dom";
// import {EditMyPractice} from "./EditMyPractice";
// import MyPractice from "./myPractice";
import ViewPracticeTeacher from "./ViewPracticeTeacher";
import { EditPracticeTeacher } from "./EditPracticeTeacher";
import ViewAll from "./ViewAll";



export const RoutePracticeTeacher = () => {
	const { pathname } = useLocation()
      if (pathname.includes('edit')){
		return <ViewPracticeTeacher/>
	}else {
		return <ViewAll/>
	}
}
