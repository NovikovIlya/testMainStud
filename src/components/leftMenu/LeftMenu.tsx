import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ILeftMenu } from '../../models/leftMenu';



export const LeftMenu = (props: ILeftMenu) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const handleNavigate = (url: string) => {
        navigate(url)
    }
    return (
        <div className={'shadowNav mt-20 h-screen'}>
            <ul className="min-w-[260px] pt-14 flex flex-col gap-4 ">
                {
                    props.navList.map((elem, index) => (
                        <li
                            key={index}
                            className={clsx(
                                'w-full flex items-center py-2 pl-8 hover:bg-[#F5F8FB]  cursor-pointer',
                                elem.id === pathname && 'bg-[#F5F8FB]'
                            )}
                            onClick={() => handleNavigate(elem.id)}
                        >
                            <div className="flex items-center gap-[10px]">
                                {elem.icon}
                                <p className="text-base">{t(elem.name)}</p>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

