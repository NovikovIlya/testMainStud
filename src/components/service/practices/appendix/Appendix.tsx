
import {useLocation} from "react-router-dom";
import CreateAppendix from "./CreateAppendix";
import EditAppendix from "./EditAppendix";
import ViewAppendix from "./ViewAppendix";



export const Appendix = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createAppendix')) {
		return <CreateAppendix />
	}  else if (pathname.includes('edit')){
		return <EditAppendix/>
	}else {
		return <ViewAppendix/>
	}
}
