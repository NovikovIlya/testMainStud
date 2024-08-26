import React from 'react';
import { SupervisorInterviewItem } from './SupervisorInterviewItem'
import {
	useGetSupervisorInterviewQuery
} from '../../../../../store/api/serviceApi'
import { useNavigate } from 'react-router-dom'

export const SupervisorInterviews = () => {

	const { data: interviews = [] } = useGetSupervisorInterviewQuery()


	return (
        <div className="w-full mx-16 mt-[120px]">
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
				</div>
				<SupervisorInterviewItem
					format={'ONLINE'}
					id={2}
					post={'Технический Директор'}
					respondId={2}
					seeker=
						{{firstName: 'Яковлев', middleName: 'Кирилл', lastName: 'Артемович'}}
					time={'2024-08-30T12:00:00.000Z'}
				></SupervisorInterviewItem>
				<SupervisorInterviewItem
					format={'ONLINE'}
					id={3}
					post={'Технический Директор'}
					respondId={3}
					seeker=
						{{firstName: 'Яковлев', middleName: 'Кирилл', lastName: 'Артемович'}}
					time={'2024-08-26T13:20:00.000Z'}
				></SupervisorInterviewItem>
			</div>
				</div>
	);
};