
import {useLocation} from "react-router-dom";


import CreateFinally from "./createFinally";
import EditFinnaly from "./EditFinnaly";
import ViewFinally from "./ViewFinally";



export const Finally = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createAppendix')) {
		return < CreateFinally/>
	}  else if (pathname.includes('edit')){
		return <EditFinnaly/>
	}else {
		return <ViewFinally/>
	}
}
