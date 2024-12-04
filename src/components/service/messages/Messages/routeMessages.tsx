
import {useLocation} from "react-router-dom";
// import {EditMyPractice} from "./EditMyPractice";
// import MyPractice from "./myPractice";
import ViewPracticeTeacher from "../../practiceTeacher/practiceTeacher/ViewPracticeTeacher";

import {ViewAll} from "../../practiceTeacher/practiceTeacher/ViewAll";
import { ViewMessage } from "./ViewMessages";



export const RouteMessage = () => {
	const { pathname } = useLocation()
      if (pathname.includes('edit')){
		return <ViewMessage/>
	}else {
		return <ViewMessage/>
	}
}
