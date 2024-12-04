
import {useLocation} from "react-router-dom";
import {EditMyPractice} from "./EditMyPractice";
import MyPractice from "./myPractice";



export const RouteMyPractice = () => {
	const { pathname } = useLocation()
      if (pathname.includes('edit')){
		return <EditMyPractice/>
	}else {
		return <MyPractice/>
	}
}
