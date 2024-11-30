import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { useGetSupervisorVacancyQuery } from '../../../../../store/api/serviceApi'

import SupervisorVacancyItem from './SupervisorVacancyItem'

export const SupervisorVacancies = () => {
	const { data: vacancies = [], isLoading: loading } =
		useGetSupervisorVacancyQuery()

	if (loading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin
							indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}
						></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">
							Идёт загрузка...
						</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">
					Вакансии
				</h1>
				<div className="mt-[60px] ml-[20px] flex">
					<h3 className="w-[238px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Должность
					</h3>
					<div className="ml-[30px] flex gap-[40px]">
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							Опыт работы
						</h3>
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
							График работы
						</h3>
					</div>
					<h3 className="ml-[140px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Заработная плата
					</h3>
				</div>
				<div className="mt-[16px] mb-[50px] flex flex-col w-full gap-[10px]">
					{vacancies.map(vac => (
						<SupervisorVacancyItem {...vac} key={vac.id} />
					))}
				</div>
			</div>
		</>
	)
}
