import React from 'react';
import {MailFeedbackWindowSgv} from "../../assets/svg/MailFeedbackWindowSgv";
import {PhoneFeedbackWindow} from "../../assets/svg/PhoneFeedbackWindow";
import {Button} from "antd";
import {CloseFeedbackWindow} from "../../assets/svg/CloseFeedbackWindow";
import {TextWithSvg} from "./question/Question";
import {QuestionFeedbackSvg} from "../../assets/svg/QuestionFeedbackSvg";
import {MiniMailFeedback} from "../../assets/svg/MiniMailFeedback";
import {MiniPhoneFeedback} from "../../assets/svg/MiniPhoneFeedback";

type TypeFeedbackWindow = {
    closeWindow: () => void
}

const listQuestion = [
    {id: 1, text: 'Как подключиться к Wi-Fi КФУ?', icon: <QuestionFeedbackSvg/>},
    {id: 2, text: 'Как получить учетные данные?', icon: <QuestionFeedbackSvg/>},
    {id: 3, text: 'Ответы на частые вопросы', icon: <QuestionFeedbackSvg/>},
]

const listPossible = [
    {id: 1, text: 'Написать письмо', icon: <MiniMailFeedback/>},
    {id: 2, text: 'Позвонить', icon: <MiniPhoneFeedback/>},
]


export const FeedbackWindow = ({closeWindow}: TypeFeedbackWindow) => {
    return (
        <div className={`
        flex flex-col items-center 
        justify-center w-[324px] 
        h-[468px] bg-white
        `}>
            <div className={`
            bg-white shadow-lg
            w-[348px] h-[150px]
            absolute left-0 top-0 
            rounded-lg flex items-center 
            justify-center`}>
                <Button className={`border-none shadow-none absolute top-[10px] right-0`}
                        onClick={closeWindow}>
                    <CloseFeedbackWindow/>
                </Button>
                <div className={'flex flex-col gap-2 justify-center items-center'}>
                    <span className={`font-bold text-[18px]/[25px]`}>Центр поддержки</span>
                    <span className={`text-[12px]/[17px] text-[#808080]`}>Работаем с Пн - Пт, 8:00 - 18:00</span>
                    <div className={'flex gap-5'}>
                        <MailFeedbackWindowSgv/>
                        <PhoneFeedbackWindow/>
                    </div>
                </div>
            </div>
            <div className={`flex flex-col absolute bottom-[25px]`}>
                <div className={`flex w-full pt-4 pb-4 border-solid border-b-2 border-0 border-[#D9D9D9]`}>
                    <div className={`flex flex-col gap-4`}>
                        {
                            listQuestion.map((elem) => (
                                <TextWithSvg text={elem.text} key={elem.id} icon={elem.icon}/>
                            ))
                        }
                    </div>
                </div>
                <div className={`flex w-full pt-4 pb-4 border-solid border-b-2 border-0 border-[#D9D9D9]`}>
                    <div className={`flex flex-col gap-4`}>
                        {
                            listPossible.map((elem) => (
                                <TextWithSvg text={elem.text} icon={elem.icon} key={elem.id}/>
                            ))
                        }
                    </div>
                </div>

                <div className={'flex py-4 gap-2 justify-center'}>
                    <span className={'text-[17px]/[19px] font-bold text-[#808080]'}>
                        deshelp@kpfu.ru
                    </span>
                    <div className={'border-solid border-r-2 border-0 border-[#D9D9D9]'}></div>
                    <span className={'text-[17px]/[19px] font-bold text-[#808080]'}>
                        +7 (843) 206-50-84
                    </span>
                </div>

            </div>
        </div>
    );
};

