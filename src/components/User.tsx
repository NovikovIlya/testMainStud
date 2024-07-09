import {useTranslation} from 'react-i18next'
import DropDrag from './dnd/DropDrag'
import {Layout} from './layout/Layout'
import {Button, ConfigProvider, Popover} from "antd";
import {useEffect, useState} from "react";
import {SupportCenterSvg} from "../assets/svg/SupportCenterSvg";
import {FeedbackWindow} from "./feedbackWindow/FeedbackWindow";
import {useGetContractsAllQuery} from "../store/api/practiceApi/roster";
import {useCheckIsEmployeeQuery} from "../store/api/practiceApi/contracts";

export const User = () => {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    console.log('sd')
    const {data, isSuccess} = useCheckIsEmployeeQuery()

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem('practice', 'practice')
        }
    }, [data]);


    return (
        <Layout>
            <div className="px-10 flex items-center justify-center">
                <div className="max-w-[1600px] w-[1600px]">
                    <div className={`mt-[125px] text-2xl font-bold text-blue1f5`}>
                        {t('PersonalAccount')}
                    </div>
                    <DropDrag/>
                </div>

                <ConfigProvider
                    theme={{
                        token: {
                            borderRadiusLG: 20
                        }
                    }}
                >
                    <Popover trigger="click"
                             content={<FeedbackWindow closeWindow={hide}/>}
                             placement={"topLeft"}
                             arrow={false}
                             open={open}
                             onOpenChange={handleOpenChange}>
                        <Button
                            type={"primary"}
                            className={`
                        flex items-center justify-center 
                        fixed rounded-full w-[62px] h-[62px] 
                        right-[3%] bottom-[25px]
                        shadow-2xl`}>
                            <SupportCenterSvg/>
                        </Button>
                    </Popover>

                </ConfigProvider>


            </div>
        </Layout>
    );
}
