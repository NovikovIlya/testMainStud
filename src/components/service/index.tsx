import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import {NavAboutMe} from './aboutMe/NavAboutMe'
import {NavUnifiedServiceCenter} from './documentFlow/NavUnifiedServiceCenter'
import {NavElectronicBook} from './electronicBook/NavElectronicBook'
import {NavPractices} from './practices/NavPractices'
import {NavSchedule} from './schedule/NavSchedule'
import {NavSession} from './session/NavSession'
import {NavSetting} from './setting/NavSetting'
import {NavBusinessTrip} from "./businessTrip/NavBusinessTrip";
import {useCheckIsEmployeeQuery} from "../../store/api/practiceApi/contracts";

export const Service = () => {
    const {pathname} = useLocation()
    const userData = JSON.parse(localStorage.getItem('user')!)
    const nav = useNavigate()

    const {data, error, isError, isSuccess } = useCheckIsEmployeeQuery()

    const isEmpl = userData.roles[1].type === 'EMPL'



    return (
        <div className="h-screen w-screen">
            <div className="flex min-h-full">
                {pathname.includes('/services/schedule') && <NavSchedule/>}
                {pathname.includes('/services/session') && <NavSession/>}
                {pathname.includes('/services/aboutMe') && <NavAboutMe/>}
                {pathname.includes('/services/electronicBook') && <NavElectronicBook/>}
                {pathname.includes('/services/setting') && <NavSetting/>}

                {
                    isSuccess
                    &&
                    pathname.includes('/services/practices')
                        ?
                        <NavPractices/>
                        :
						<Navigate to={'/user'}/>
                }
                {/*{pathname.includes('/services/businessTrip') && <NavBusinessTrip/>}*/}
                {pathname.includes('/services/unifiedServiceCenter') && (
                    <NavUnifiedServiceCenter/>
                )}
            </div>
        </div>
    )
}
