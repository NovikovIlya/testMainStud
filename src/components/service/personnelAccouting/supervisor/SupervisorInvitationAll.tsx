import React from 'react';
import { SupervisorInvitationAllElem } from './SupervisorInvitationAllElem'

export const SupervisorInvitationAll = () => {
    return (
        <div className="w-full mx-16 pt-[120px]">
            <h1 className="font-normal text-3xl mb-14">Все собеседования</h1>
            <div className="flex flex-col">
                <div className="w-full flex flex-row pb-4 pl-[20px]">
                    <h3 className="
							w-[250px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Должность</h3>
                    <h3 className="
							w-[150px] ml-[4%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">ФИО</h3>
                    <h3 className="
							w-[90px] ml-[11.5%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Дата</h3>
                    <h3 className="
							w-[90px] ml-[1%] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray
							">Формат</h3>
                </div>
                <div className="flex flex-col gap-[12px]">
                    
                </div>
            </div>
        </div>
    );
};