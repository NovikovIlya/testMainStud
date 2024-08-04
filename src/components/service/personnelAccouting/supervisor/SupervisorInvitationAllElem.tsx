import React from 'react';

interface SupervisorInvitationAllElemProps {
    job_grade : string,
    name : string,
    date : string,
    type : string,
    time_left : any,
}
export const SupervisorInvitationAllElem = ( props : SupervisorInvitationAllElemProps ) => {
    return (
        <div className="
						flex
						bg-white
						p-5
						items-center
						">
            <span>{props.job_grade}</span>
            <span>{props.name}</span>
            <span>{props.date}</span>
            <span>{props.type}</span>
            <div className="
							flex
							justify-end
							gap-5
							px-5
							">
                <button className="
										 bg-[#3073D7]
										 rounded-3xl
										 py-2
										 px-12
										 border-0
										 text-white
										 text-base
										 cursor-pointer
										 ">Осталось 3дн 4ч
                </button>
                <button className="
										 bg-[#FFFFFF]
										 rounded-3xl
										 py-2
										 px-6
										 border
										 text-black
										 text-base
										 cursor-pointer
										 ">Подробнее
                </button>
            </div>
        </div>
    );
};