
import {useLocation} from "react-router-dom";
import ViewRepresentation from "./ViewRepresentation";
import CreateRepresentation from "./CreateRepresentation";
import EditRepresentation from "./EditRepresentation";


export const Representation = () => {
	const { pathname } = useLocation()
	if (pathname.includes('createRepresentation')) {
		return <CreateRepresentation />
	}  else if (pathname.includes('edit')){
		return <EditRepresentation/>
	}else {
		return <ViewRepresentation/>
	}
}
