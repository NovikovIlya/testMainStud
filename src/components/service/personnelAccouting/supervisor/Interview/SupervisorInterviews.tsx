import React from 'react';
import { SupervisorInterviewItem } from './SupervisorInterviewItem'
import {
	useGetSupervisorInterviewQuery
} from '../../../../../store/api/serviceApi'

export const SupervisorInterviews = () => {

	const { data: interviews = [] } = useGetSupervisorInterviewQuery()

	return (
        <div className="w-full mx-16 mt-[120px]">
            <h1 className="font-normal text-3xl mb-14">Все собеседования</h1>
            <div className="flex flex-col">
                <div className="w-full flex flex-row pb-4 px-5">
                    <h3 className="
							w-[22%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Должность</h3>
                    <h3 className="
							w-[22%] ml-[3%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">ФИО</h3>
                    <h3 className="
							w-[8%] ml-[3%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Дата</h3>
                    <h3 className="
							w-[8%]  shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Формат</h3>
					<h3 className="w-[31%] mr-[3%]"></h3>
                </div>
				<div className="flex flex-col gap-[12px]">
					{interviews.map(inter => (
						<SupervisorInterviewItem {...inter} key={inter.id} />
					))}
				</div>
			</div>
				</div>
	);
};