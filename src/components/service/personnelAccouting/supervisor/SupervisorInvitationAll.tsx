import React from 'react';
import { SupervisorInvitationAllElem } from './SupervisorInvitationAllElem'

export const SupervisorInvitationAll = () => {
    return (
        <div className="w-full mx-16 mt-36">
            <h2 className="font-normal text-3xl mb-14">Все собеседования</h2>
            <div className="flex flex-col">
                <div className="
						flex
						flex-row
						mb-4
						pl-4
						">
							<span className="
							text-[#626364]
							">Должность</span>
                    <span className="
							text-[#626364]
							">ФИО</span>
                    <span className="
							text-[#626364]
							">Дата</span>
                    <span className="
							text-[#626364]
							">Формат</span>
                </div>
                <SupervisorInvitationAllElem
                    date={"18.05.24\n" +
                        "16:00"}
                    job_grade={"Специалист отдела развития сотрудничества"}
                    name={"Алексеев Дмитрий Иванович"}
                    time_left={"??"}
                    type={"Онлайн"}
                ></SupervisorInvitationAllElem>
            </div>
        </div>
    );
};