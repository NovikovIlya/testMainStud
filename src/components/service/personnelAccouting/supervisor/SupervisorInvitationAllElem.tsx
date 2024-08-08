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
                        w-full
						flex
						bg-white
						p-5
						items-center
						">
            <span className="w-[250px]">{props.job_grade}</span>
            <span className="w-[18%] ml-[5%]">{props.name}</span>
            <span className="w-[6%] ml-[6%]">{props.date}</span>
            <span className="w-[6%] ml-[3%]">{props.type}</span>
            <button className="
										 w-[18%]
										 ml-[6%]
										 bg-[#3073D7]
										 rounded-3xl
										 py-2
										 border-0
										 text-white
										 text-base
										 cursor-pointer
										 ">Осталось 3дн 4ч
            </button>
            <button className="
                                         ml-[2%]
                                         mr-[1%]
										 w-[10%]
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
    );
};