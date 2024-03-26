import React from 'react';
import {LeftBack} from "../../../assets/svg/LeftBack";
import {CloseFeedbackWindow} from "../../../assets/svg/CloseFeedbackWindow";
import {Button, Input, Upload} from "antd";
import {PaperClip} from "../../../assets/svg/PaperClip";
import {Contacts} from "../contacts/Contacts";

type TypeFeedbackForm = {
    closeWindow: () => void
    setIsFirstWindow: (step: boolean) => void
}

export const FeedbackForm = ({closeWindow, setIsFirstWindow}: TypeFeedbackForm) => {
    return (
        <div className={`
        flex flex-col items-center 
        justify-center w-[324px] bg-white gap-3
        `}>
            <div className={`
            flex flex-col gap-2 w-full`}>
                <div className={`
                flex justify-between w-full items-center`}>
                    <Button className={`
                border-none flex items-center shadow-none p-0 h-max`} onClick={() => {setIsFirstWindow(true)}}>
                        <LeftBack/>
                    </Button>
                    <span className={`
                    text-[18px]/[25px] font-bold`}>
                            Письмо
                        </span>
                    <Button className={`
                border-none flex items-center shadow-none p-0 h-max`} onClick={closeWindow}>
                        <CloseFeedbackWindow/>
                    </Button>
                </div>
                <span className={`
                    text-[12px]/[16px] text-[#5F5F5F]`}>
                    Время ответа зависит от нагрузки на операторов, но обычно не превышает 1 рабочего дня
                </span>
            </div>

            <div className={`flex flex-col gap-2 w-full`}>
                <Input placeholder={'Имя'} className={`
                shadow-[0_3px_5px_0px_#00000026] 
                placeholder:text-[#808080]`}/>
                <Input placeholder={'Email для ответа'} className={`
                shadow-[0_3px_5px_0px_#00000026] 
                placeholder:text-[#808080]`}/>
                <Input.TextArea rows={4} placeholder={'Текст'} className={`
                shadow-[0_3px_5px_0px_#00000026] 
                placeholder:text-[#808080]
                `}/>
                <div className={`flex w-full justify-between items-start`}>
                    <Upload name={'file'} multiple={true}>
                        <Button className={`
                            bg-none shadow-none border-none gap-2 p-0 h-max flex items-center`}>
                            <PaperClip/>
                            <span className={`
                                text-[12px]/[16px] 
                                text-[#808080]`}>
                                Прикрепить файл
                            </span>
                        </Button>
                    </Upload>
                    <span className={`
                        mt-[3px] text-[12px]/[16px] text-[#808080]`}>
                        Максимум 8 МБ
                    </span>
                </div>
                <div className={`
                    flex flex-col gap-2
                    `}>
                    <Button type={'primary'}>
                        Отправить письмо
                    </Button>
                    <span className={`
                        text-center text-[12px]/[16px] text-[#808080]
                    `}>
                        Отправляя письмо, вы соглашаетесь на обработку персональных данных
                    </span>
                </div>
                <Contacts/>
            </div>

        </div>
    );
};

