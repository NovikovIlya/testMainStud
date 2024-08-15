import React from 'react';
import { SupervisorInterviewItem } from './SupervisorInterviewItem'
import {
	useGetSupervisorInterviewQuery
} from '../../../../store/api/serviceApi'
import { useNavigate } from 'react-router-dom'

export const SupervisorInterviews = () => {

	const { data: interviews = [] } = useGetSupervisorInterviewQuery()
	const navigate = useNavigate()


	return (
        <div className="w-full mx-16 pt-[120px]">
            <h1 className="font-normal text-3xl mb-14">Все собеседования</h1>
            <div className="flex flex-col">
                <div className="w-full flex flex-row pb-4 px-5">
                    <h3 className="
							w-[25%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Должность</h3>
                    <h3 className="
							w-[20%] ml-[2%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">ФИО</h3>
                    <h3 className="
							w-[8%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Дата</h3>
                    <h3 className="
							w-[8%] ml-[1%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Формат</h3>
										<h3 className="w-[34%] ml-[2%]"></h3>
                </div>
							<div className="flex flex-col gap-[12px]">
								{interviews.map(inter => (
									<SupervisorInterviewItem {...inter} key={inter.id} />
								))}
								<SupervisorInterviewItem date={'18.05.24\n' +
									'16:00'} id={123}
																				 job_grade={'Специалист Центра образовательных программ и экскурсий'}
																				 name={'Мочалов Сергей Сергеевич'} time_left={'3 дня 4 часа'}
																				 type={'Онлайн'} status={'ONLINE_INACTIVE'} url={'https://google.com'}></SupervisorInterviewItem>
							</div>
						</div>
				</div>
	);
};