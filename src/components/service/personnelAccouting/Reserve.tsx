import { useGetReservedResponcesQuery } from '../../../store/api/serviceApi'

import { ReserveItem } from './ReserveItem'

export const Reserve = () => {
	const { data: reserve = [], refetch } = useGetReservedResponcesQuery()

	return (
		<>
			<div className="w-full pl-[52px] pr-[52px] pt-[60px]">
				<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">
					Резерв
				</h1>
				<div className="w-full flex mt-[52px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[20%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Должность
					</h3>
					<h3 className="ml-[5%] w-[15%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
				</div>
				{reserve.map(respond => (
					<ReserveItem
						id={respond.id}
						name={
							respond.userData?.lastname +
							' ' +
							respond.userData?.firstname +
							' ' +
							respond.userData?.middlename
						}
						respondDate={respond.respondDate}
						refetch={refetch}
						post={respond.desiredJob}
					/>
				))}
			</div>
		</>
	)
}
