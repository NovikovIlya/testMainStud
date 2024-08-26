import { Button, ConfigProvider, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { InterviewItemType } from '../../../../../store/reducers/type'
import { setCurrentInterview } from '../../../../../store/reducers/CurrentInterviewSlice'
import { useLazyGetInterviewViewQuery } from '../../../../../store/api/serviceApi'

export const SupervisorInterviewItem = ( props : InterviewItemType ) => {

    interface InterviewButtonElemProps {
        id: any
    }
    interface InterviewTimeElemProps {
        eventTime: string
    }
    interface InterviewFormatElemProps {
        format: string
    }
    interface CountdownButtonProps {
        eventTime: string
        format: string
    }

    const [getInterview, result] = useLazyGetInterviewViewQuery()

    const [isUnsuccessModalOpen, setIsUnsuccessModalOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const seekerName
        =
        props.seeker.firstName
        + ' '
        + props.seeker.middleName
        + ' '
        + props.seeker.lastName

    const InterviewCountdownTimeElem = (props : CountdownButtonProps) => {
        const [timeLeft, setTimeLeft] = useState<number>(0);

        useEffect(() => {
            const updateTimeLeft = () => {
                const targetDate = new Date(props.eventTime);
                const now = new Date();
                const difference = targetDate.getTime() - now.getTime();
                setTimeLeft(difference);
                return difference
            };

            updateTimeLeft(); // Обновляем сразу при монтировании

            const intervalId = setInterval(updateTimeLeft, 1000); // Обновляем каждую секунду

            return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
        }, [props.eventTime]);

        const targetDate = new Date(props.eventTime);
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();
        const minutes: number = Math.floor((difference / 1000 / 60) % 60);
        const hours: number = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days: number = Math.floor(difference / (1000 * 60 * 60 * 24));

        const isLessThanFiveMinutes = timeLeft > 0 && timeLeft <= 5 * 60 * 1000;

        let datePublicString : string = ''
        const isDaysEmpty : boolean = days === 0
        const isHoursEmpty : boolean = hours === 0

        if (isDaysEmpty && isHoursEmpty) {
            datePublicString += 'Осталось ' + minutes + ' минут'
        }
        if (isDaysEmpty && !isHoursEmpty) {
            datePublicString += 'Осталось ' + hours + ' ч' + minutes + ' м'
        }
        if (!isDaysEmpty && !isHoursEmpty) {
            datePublicString += 'Осталось ' + days + ' дн ' + hours + ' ч'
        }
        return (
            <div className="flex items-center">
                {(props.format === "OFFLINE") && (
                    <span className="w-[200px] opacity-[0%]"></span>
                )}
                {(props.format === "ONLINE") && (isLessThanFiveMinutes) && !(difference<0) &&  (
                    <span className="w-[200px] flex justify-center bg-[#3073D7] text-white font-content-font cursor pointer font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-0">
                 Подключиться</span>
                )}
                {(props.format === "ONLINE") && (!isLessThanFiveMinutes) && !(difference<0) && (
                    <span className="w-[200px] flex justify-center bg-[#3073D7] opacity-[32%] text-white font-content-font font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-0">
                {datePublicString}</span>
                )}
                {(props.format === "ONLINE") && (difference<0) && (
                    <span className="w-[200px] flex justify-center bg-[#3073D7] opacity-[32%] text-white font-content-font font-normal text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-0">
                Время истекло</span>
                )}
            </div>
        );
    }

    const InterviewTimeElem = (props :  InterviewTimeElemProps) =>  {
        const date : Date = new Date(props.eventTime);

        // Получаем локальное время
        const localDate = date.toLocaleString('ru-RU', {
            timeZoneName: 'short',
            hour12: false,
        });

        // Преобразуем строку в формат "дд.мм.гг чч:мм"
        const [datePart, timePart] = localDate.split(', ');
        const [day, month, year] = datePart.split('.');

// Получаем последние две цифры года
        const shortYear : string = year.slice(-2);
        const shortTime : string = timePart.substring(0, 5);
        const datePublicString = day + '.' + month + '.' + shortYear + ' ' + shortTime;

        return (
            <>
                <span className="w-[8%]">{datePublicString}</span>
            </>
        )
    }
    const InterviewFormatElem = (props: InterviewFormatElemProps) => {
        return(
            <>
                {props.format === "OFFLINE" && (
                    <span className="w-[8%] ml-[1%] ">Оффлайн</span>
                )}
                {props.format === "ONLINE" && (
                    <span className="w-[8%] ml-[1%] ">Онлайн</span>
                )}
            </>
        )
    }
    const InterviewButtonElem = (props: InterviewButtonElemProps) => {
        return (
            <>
                <Button
                    onClick={() => {
                            dispatch(setCurrentInterview(props.id))
                            navigate('/services/personnelaccounting/supervisor/invitation/seekerinfo')
                    }}
                    className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
                >
                    Подробнее
                </Button>
            </>
        )
    }
    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
                    }
                }}
            >
                <Modal
                    bodyStyle={{ padding: 53 }}
                    centered
                    open={isUnsuccessModalOpen}
                    onCancel={() => {
                        setIsUnsuccessModalOpen(false)
                    }}
                    title={null}
                    footer={null}
                    width={407}
                >
                    <p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
                        Произошла ошибка или нет ответа от сервера.
                    </p>
                    <div className="mt-[40px] flex gap-[12px]">
                        <Button
                            className="ml-auto mr-auto"
                            type="primary"
                            onClick={() => {
                                setIsUnsuccessModalOpen(false)
                            }}
                        >
                            ОК
                        </Button>
                    </div>
                </Modal>
            </ConfigProvider>
            <div className="w-full flex bg-white p-5 items-center">
                <span className="w-[25%] ">{props.post}</span>
                <span className="w-[20%] ml-[2%] ">{seekerName}</span>
                <InterviewTimeElem eventTime={props.time}></InterviewTimeElem>
                <InterviewFormatElem format={props.format}></InterviewFormatElem>
                <div className="w-[34%] ml-[2%] flex flex-row items-center justify-evenly">
                    <InterviewCountdownTimeElem eventTime={props.time}  format={props.format}/>
                    <InterviewButtonElem id={props.id}></InterviewButtonElem>
                </div>
            </div>
        </>
    );
};