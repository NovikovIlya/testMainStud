
import {useLocation} from "react-router-dom";

import CreateOrder from "./CreateOrder";
import { ViewPracticeOrder } from "./ViewPracticeOrder";
import EditOrder from "./EditOrder";


export const PracticeOrder = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createOrder')) {
		return <CreateOrder />
	}  else if (pathname.includes('edit')){
		return <EditOrder/>
	}else {
		return <ViewPracticeOrder/>
	}
}
