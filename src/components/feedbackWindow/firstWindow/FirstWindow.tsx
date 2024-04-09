import React from 'react';
import {Button} from "antd";
import {CloseFeedbackWindow} from "../../../assets/svg/CloseFeedbackWindow";
import {MailFeedbackWindowSgv} from "../../../assets/svg/MailFeedbackWindowSgv";
import {PhoneFeedbackWindow} from "../../../assets/svg/PhoneFeedbackWindow";
import {TextWithSvg} from "../question/Question";
import {MiniMailFeedback} from "../../../assets/svg/MiniMailFeedback";
import {MiniPhoneFeedback} from "../../../assets/svg/MiniPhoneFeedback";
import {Contacts} from "../contacts/Contacts";
import {QuestionFeedbackSvg} from "../../../assets/svg/QuestionFeedbackSvg";

const listQuestion = [
    {id: 1, text: 'Как подключиться к Wi-Fi КФУ?', icon: <QuestionFeedbackSvg/>},
    {id: 2, text: 'Как получить учетные данные?', icon: <QuestionFeedbackSvg/>},
    {id: 3, text: 'Ответы на частые вопросы', icon: <QuestionFeedbackSvg/>},
]
type TypeFirstWindow = {
    closeWindow: () => void
    setIsFirstWindow: (step: boolean) => void
}

export const FirstWindow = ({closeWindow, setIsFirstWindow}: TypeFirstWindow) => {
    return (
        <div className={`
        flex flex-col items-center 
        justify-center w-[324px]
         bg-white
        `}>
            <div className={`
            bg-white shadow-lg
            w-[348px]
            rounded-[20px]
            flex items-center 
            justify-center`}>
                <Button className={`border-none shadow-none absolute top-[10px] right-0`}
                        onClick={closeWindow}>
                    <CloseFeedbackWindow/>
                </Button>
                <div className={'flex flex-col gap-2 justify-center items-center pt-[10px] pb-[15px]'}>
                    <span className={`font-bold text-[18px]/[25px]`}>Центр поддержки</span>
                    <span className={`text-[12px]/[17px] text-[#808080]`}>Работаем с Пн - Пт, 8:00 - 18:00</span>
                    {/*<div className={'flex gap-5 mb-[20px]'}>*/}
                    {/*    <MailFeedbackWindowSgv/>*/}
                    {/*    <PhoneFeedbackWindow/>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={`flex flex-col w-full px-[10px]`}>
                <div className={`flex w-full pt-4 pb-4 border-solid border-b-2 border-0 border-[#D9D9D9]`}>
                    <div className={`flex flex-col`}>
                        {
                            listQuestion.map((elem) => (
                                <TextWithSvg text={elem.text} key={elem.id} icon={elem.icon}/>
                            ))
                        }
                    </div>
                </div>
                <div className={`flex w-full pt-4 pb-4`}>
                    <div className={`flex flex-col w-full`}>
                        <div className={'cursor-pointer hover:bg-[#F8F8F8] w-full rounded-[5px]'}
                             onClick={() => setIsFirstWindow(false)}
                        >
                            <TextWithSvg text={'Написать письмо'} icon={<MiniMailFeedback/>}/>
                        </div>
                        {/*<TextWithSvg text={'Позвонить'} icon={<MiniPhoneFeedback/>}/>*/}
                    </div>
                </div>
                <Contacts/>
            </div>
        </div>
    );
};

