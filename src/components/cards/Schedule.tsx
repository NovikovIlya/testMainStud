// import { Button, Spin } from 'antd'
// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router-dom'
// import img from '../../assets/images/image15.png'
// import { useGetCurrentDateQuery, useGetScheduleQuery } from '../../store/api/serviceApi'
// import { blue004 } from '../../utils/color'
// import { week } from '../../models/cards'
// import { truncateString } from '../../utils/truncateString'

// function getWeekDay(date: Date): week {
//     const days: week[] = [
//         'sunday',
//         'monday',
//         'tuesday',
//         'wednesday',
//         'thursday',
//         'friday',
//         'saturday',
//     ]
//     return days[date.getDay()]
// }

// export const Schedule = () => {
//     const navigate = useNavigate()
//     const date = new Date(Date.now())
//     const [activeButton, changeActive] = useState<week>(getWeekDay(date))
//     const { data: schedule, isFetching } = useGetScheduleQuery()
//     const { data: dataCurrentDate, isLoading: isLoadingDate } = useGetCurrentDateQuery()
//     const { t } = useTranslation()
//     const [filteredSchedule, setFilteredSchedule] = useState<any>(null)
    
//     // Функция для преобразования даты в формате "DD.MM.YYYY" в объект Date
//     const parseRussianDate = (dateStr: string) => {
//         // Преобразуем формат "DD.MM.YYYY" в "YYYY-MM-DD" для создания Date
//         const [day, month, year] = dateStr?.split('.');
//         return new Date(`${year}-${month}-${day}`);
//     };
    
//     // Функция для проверки, входит ли текущая дата в диапазон duration
//     const isLessonActive = (duration: string) => {
//         if (!dataCurrentDate?.date || !duration) return true;
        
//         try {
//             // Преобразуем текущую дату
//             const currentDate = parseRussianDate(dataCurrentDate?.date);
            
//             // Преобразуем даты из duration
//             const [startDateStr, endDateStr] = duration?.split('-');
            
//             // Для дат в формате "DD.MM.YY" добавляем "20" к году
//             const parseShortDate = (dateStr: string) => {
//                 const [day, month, shortYear] = dateStr?.trim().split('.');
//                 return new Date(`20${shortYear}-${month}-${day}`);
//             };
            
//             const startDate = parseShortDate(startDateStr);
//             const endDate = parseShortDate(endDateStr);
//             // Проверяем, входит ли текущая дата в диапазон
//             return currentDate >= startDate && currentDate <= endDate;
//         } catch (error) {
//             console.error('Ошибка при обработке дат:', error);
//             return true;
//         }
//     };
    
//     // Фильтрация предметов по текущей дате
//     const filterScheduleByDate = () => {
//         if (!schedule) return null;
        
//         const filtered = {};
        
//         // Проходим по всем дням недели
//         Object.keys(schedule).forEach(day => {
// 				// @ts-ignore
//             if (Array.isArray(schedule[day])) {
// 				// @ts-ignore
//                 filtered[day] = schedule[day].filter(lesson => isLessonActive(lesson.duration));
//             } else {
// 					// @ts-ignore
//                 filtered[day] = schedule[day];
//             }
//         });
//         return filtered;
//     };
    
//     // Обновляем отфильтрованное расписание при изменении данных
//     useEffect(() => {
//         if (schedule && dataCurrentDate?.date) {
//             const filtered = filterScheduleByDate();
//             setFilteredSchedule(filtered);
//         }
//     }, [schedule, dataCurrentDate?.date]);
    
//     const setActiveButton = (buttonName: week) => {
//         if (activeButton !== buttonName) changeActive(buttonName)
//     }

//     const disableStyle = {
//         color: 'white',
//         border: 0,
//         backgroundColor: 'inherit'
//     }
//     const activeStyles = {
//         color: blue004,
//         border: 'solid 1px blue004',
//         backgroundColor: 'white'
//     }

//     return (
//         <Spin className='' spinning={isFetching || isLoadingDate}>
//         <div className='h-[320px] max-md:h-auto'>>
//             <div
//             className="shadow-md py-10 pl-10 max-xl:p-5 max-md:px-5 max-md:py-5 flex w-full h-full max-md:justify-between max-md:items-center rounded-[20px] text-white"
//             style={{
//                 background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
//             }}
//         >
//             {/* Мобильный заголовок и стрелка */}
//             <div className="md:hidden flex justify-between items-center w-full">
//                 <span className="bg-none text-4xl font-bold">
//                     {t('Schedule')}
//                 </span>
//                 <div
//                     onClick={() => navigate('/services/schedule/schedule')}
//                     className="cursor-pointer"
//                 >
//                     <svg
//                         width="24"
//                         height="24"
//                         viewBox="0 0 87 40"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                             d="M1 20.4528C1 20.4528 52.8054 20.4528 86 20.4528M86 20.4528C80.4447 12.856 71.7748 1 71.7748 1M86 20.4528C80.4447 27.6959 71.7748 39 71.7748 39"
//                             stroke="white"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </div>
//             </div>

//             {/* Десктопная версия */}
//             <div className="max-md:hidden flex w-full h-full">
//                 <div className="flex flex-col h-full justify-between w-full max-w-sm">
//                     <span className="bg-none text-4xl font-bold text-start max-xl:text-3xl">
//                         {t('Schedule')}
//                     </span>
//                     <div className="flex w-full flex-wrap gap-1 mb-14">
//                         <Button
//                             style={activeButton === 'monday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('monday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Mon')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'tuesday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('tuesday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Tue')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'wednesday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('wednesday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Wed')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'thursday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('thursday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Thu')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'friday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('friday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Fri')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'saturday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('saturday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Sat')}
//                         </Button>
//                         <Button
//                             style={activeButton === 'sunday' ? activeStyles : disableStyle}
//                             onClick={() => setActiveButton('sunday')}
//                             className="text-lg font-bold h-[40px]"
//                         >
//                             {t('Sun')}
//                         </Button>
//                     </div>
//                 </div>
//                 <div className="flex items-center justify-center w-full max-md:hidden">
//                     <div className="bg-white rounded-full w-[125px] h-[125px] absolute"></div>
//                     <img
//                         src={img}
//                         alt=""
//                         width={160}
//                         height={160}
//                         className="bottom-[40px] z-10"
//                     />
//                 </div>
//                 <hr className="h-full w-[2px] bg-white mx-3 border-none" />
//                 <div className="flex-col justify-start w-full max-w-fit min-w-min p-2 max-h-full overflow-y-auto max-xl:text-sm">
//                     {filteredSchedule && filteredSchedule[activeButton] !== undefined ? (
//                         filteredSchedule[activeButton].length > 0 ? (
//                             filteredSchedule[activeButton].map((el:any, index:any) => (
//                                 <div
//                                     className="flex w-full gap-x-10 mb-5 max-xl:gap-x-0 max-xl:mb-3 max-xl:flex-col"
//                                     key={index}
//                                 >
//                                     {el ? (
//                                         <>
//                                             <span className="text-start">{el.time.replace("-", " - ")}</span>
//                                             <span className="font-bold text-start">{truncateString(16,el.name)}</span>
//                                         </>
//                                     ) : (
//                                         <div>Нет пар</div>
//                                     )}
//                                 </div>
//                             ))
//                         ) : (
//                             <div>{t('NoLesson')}</div>
//                         )
//                     ) : (
//                         <div className='text-start'>{isFetching || isLoadingDate ? '' : t('NoLesson')}</div>
//                     )}
//                 </div>
//                 <div className="flex max-xl:hidden items-center justify-end pr-[220px] w-full">
//                     <div className="bg-white rounded-full w-44 h-44 absolute"></div>
//                     <img
//                         src={img}
//                         alt=""
//                         width={'240px'}
//                         height={'210px'}
//                         className="bottom-[40px] z-10"
//                     />
//                 </div>
//                 <div
//                     className="flex max-xl:hidden w-fit justify-center items-center "
//                     onClick={() => navigate('/services/schedule/schedule')}
//                 >
//                     <svg
//                         width="87"
//                         height="40"
//                         viewBox="0 0 87 40"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="cursor-pointer hover:scale-x-125 transition-all duration-200 mr-20"
//                     >
//                         <path
//                             d="M1 20.4528C1 20.4528 52.8054 20.4528 86 20.4528M86 20.4528C80.4447 12.856 71.7748 1 71.7748 1M86 20.4528C80.4447 27.6959 71.7748 39 71.7748 39"
//                             stroke="white"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         />
//                     </svg>
//                 </div>
//             </div>
//         </div>
//         </Spin>
//     )
// }
import { Button, Spin } from 'antd'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/images/image15.png'
import { useGetCurrentDateQuery, useGetScheduleQuery } from '../../store/api/serviceApi'
import { blue004 } from '../../utils/color'
import { week } from '../../models/cards'
import { truncateString } from '../../utils/truncateString'

function getWeekDay(date: Date): week {
    const days: week[] = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ]
    return days[date.getDay()]
}

export const Schedule = () => {
    const navigate = useNavigate()
    const date = new Date(Date.now())
    const [activeButton, changeActive] = useState<week>(getWeekDay(date))
    const { data: schedule, isFetching } = useGetScheduleQuery()
    const { data: dataCurrentDate, isLoading: isLoadingDate } = useGetCurrentDateQuery()
    const { t } = useTranslation()
    const [filteredSchedule, setFilteredSchedule] = useState<any>(null)
    
    // Функция для преобразования даты в формате "DD.MM.YYYY" в объект Date
    const parseRussianDate = (dateStr: string) => {
        // Преобразуем формат "DD.MM.YYYY" в "YYYY-MM-DD" для создания Date
        const [day, month, year] = dateStr?.split('.');
        return new Date(`${year}-${month}-${day}`);
    };
    
    // Функция для проверки, входит ли текущая дата в диапазон duration
    const isLessonActive = (duration: string) => {
        if (!dataCurrentDate?.date || !duration) return true;
        
        try {
            // Преобразуем текущую дату
            const currentDate = parseRussianDate(dataCurrentDate?.date);
            
            // Преобразуем даты из duration
            const [startDateStr, endDateStr] = duration?.split('-');
            
            // Для дат в формате "DD.MM.YY" добавляем "20" к году
            const parseShortDate = (dateStr: string) => {
                const [day, month, shortYear] = dateStr?.trim().split('.');
                return new Date(`20${shortYear}-${month}-${day}`);
            };
            
            const startDate = parseShortDate(startDateStr);
            const endDate = parseShortDate(endDateStr);
            // Проверяем, входит ли текущая дата в диапазон
            return currentDate >= startDate && currentDate <= endDate;
        } catch (error) {
            console.error('Ошибка при обработке дат:', error);
            return true;
        }
    };
    
    // Фильтрация предметов по текущей дате
    const filterScheduleByDate = () => {
        if (!schedule) return null;
        
        const filtered = {};
        
        // Проходим по всем дням недели
        Object.keys(schedule).forEach(day => {
				// @ts-ignore
            if (Array.isArray(schedule[day])) {
				// @ts-ignore
                filtered[day] = schedule[day].filter(lesson => isLessonActive(lesson.duration));
            } else {
					// @ts-ignore
                filtered[day] = schedule[day];
            }
        });
        return filtered;
    };
    
    // Обновляем отфильтрованное расписание при изменении данных
    useEffect(() => {
        if (schedule && dataCurrentDate?.date) {
            const filtered = filterScheduleByDate();
            setFilteredSchedule(filtered);
        }
    }, [schedule, dataCurrentDate?.date]);
    
    const setActiveButton = (buttonName: week) => {
        if (activeButton !== buttonName) changeActive(buttonName)
    }

    const disableStyle = {
        color: 'white',
        border: 0,
        backgroundColor: 'inherit'
    }
    const activeStyles = {
        color: blue004,
        border: 'solid 1px blue004',
        backgroundColor: 'white'
    }

    const handleNavigate = () => {
        navigate('/services/schedule/schedule')
    }

    	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    return (
        <Spin className='' spinning={isFetching || isLoadingDate}>
        <div className={`${isMobile ? 'w-full' : 'h-[320px] ' } max-md:h-auto`}>
            {/* Мобильная версия карточки */}
            <div
                className="md:hidden shadow-md p-5 flex items-center justify-between rounded-[20px] text-white cursor-pointer hover:shadow-lg transition-shadow"
                style={{
                    background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
                }}
                onClick={handleNavigate}
            >
                <span className="text-2xl font-bold">
                    {t('Schedule')}
                </span>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                >
                    <path
                        d="M9 18L15 12L9 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Десктопная версия карточки */}
            <div
                className="hidden md:flex shadow-md py-10 pl-10 max-xl:p-5 w-full h-full rounded-[20px] text-white"
                style={{
                    background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
                }}
            >
                <div className="flex flex-col h-full justify-between w-full max-w-sm">
                    <span className="bg-none text-4xl font-bold text-start max-xl:text-3xl">
                        {t('Schedule')}
                    </span>
                    <div className="flex w-full flex-wrap gap-1 mb-14">
                        <Button
                            style={activeButton === 'monday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('monday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Mon')}
                        </Button>
                        <Button
                            style={activeButton === 'tuesday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('tuesday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Tue')}
                        </Button>
                        <Button
                            style={activeButton === 'wednesday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('wednesday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Wed')}
                        </Button>
                        <Button
                            style={activeButton === 'thursday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('thursday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Thu')}
                        </Button>
                        <Button
                            style={activeButton === 'friday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('friday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Fri')}
                        </Button>
                        <Button
                            style={activeButton === 'saturday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('saturday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Sat')}
                        </Button>
                        <Button
                            style={activeButton === 'sunday' ? activeStyles : disableStyle}
                            onClick={() => setActiveButton('sunday')}
                            className="text-lg font-bold h-[40px]"
                        >
                            {t('Sun')}
                        </Button>
                    </div>
                </div>
                <hr className="h-full w-[2px] bg-white mx-3 border-none" />
                <div className="flex-col justify-start w-full max-w-fit min-w-min p-2 max-h-full overflow-y-auto max-xl:text-sm">
                    {filteredSchedule && filteredSchedule[activeButton] !== undefined ? (
                        filteredSchedule[activeButton].length > 0 ? (
                            filteredSchedule[activeButton].map((el:any, index:any) => (
                                <div
                                    className="flex w-full gap-x-10 mb-5 max-xl:gap-x-0 max-xl:mb-3 max-xl:flex-col"
                                    key={index}
                                >
                                    {el ? (
                                        <>
                                            <span className="text-start">{el.time.replace("-", " - ")}</span>
                                            <span className="font-bold text-start">{truncateString(16,el.name)}</span>
                                        </>
                                    ) : (
                                        <div>Нет пар</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div>{t('NoLesson')}</div>
                        )
                    ) : (
                        <div className='text-start'>{isFetching || isLoadingDate ? '' : t('NoLesson')}</div>
                    )}
                </div>
                <div className="flex max-xl:hidden items-center justify-end pr-[220px] w-full">
                    <div className="bg-white rounded-full w-44 h-44 absolute"></div>
                    <img
                        src={img}
                        alt=""
                        width={'240px'}
                        height={'210px'}
                        className="bottom-[40px] z-10"
                    />
                </div>
                <div
                    className="flex max-xl:hidden w-fit justify-center items-center"
                    onClick={handleNavigate}
                >
                    <svg
                        width="87"
                        height="40"
                        viewBox="0 0 87 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer hover:scale-x-125 transition-all duration-200 mr-20"
                    >
                        <path
                            d="M1 20.4528C1 20.4528 52.8054 20.4528 86 20.4528M86 20.4528C80.4447 12.856 71.7748 1 71.7748 1M86 20.4528C80.4447 27.6959 71.7748 39 71.7748 39"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
        </Spin>
    )
}