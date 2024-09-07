import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import { useGetSeekerEmploymentRespondsQuery } from '../../../../store/api/serviceApi'

import { SeekerEmploymentItem } from './SeekerEmploymentItem'

export const SeekerEmployment = () => {
	const {
		data: responds = [],
		refetch,
		isLoading: loading
	} = useGetSeekerEmploymentRespondsQuery()

	if (loading) {
		return (
			<>
				<div className="w-screen h-screen flex items-center">
					<div className="text-center ml-auto mr-auto mb-[10%]">
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
			<div id="wrapper" className="px-[52px] mt-[120px] w-full">
				<p className="font-content-font font-normal text-[28px]/[28px] text-black">
					Этап трудоустройства
				</p>
				{responds.length === 0 ? (
					<p className="text-center mt-[15%] font-content-font text-[20px]/[20px] text-black font-normal opacity-60">
						У вас пока нет вакансий на данном этапе
					</p>
				) : (
					<>
						<div className="mt-[52px] mb-[16px] flex pl-[20px] w-full pr-[55px]">
							<h3 className="w-[30%] font-content-font font-normal text-[14px]/[14px] text-text-gray">
								Вакансия
							</h3>
							<h3 className="ml-[10%] font-content-font font-normal text-[14px]/[14px] text-text-gray">
								Статус
							</h3>
						</div>
						{responds.map(resp => (
							<SeekerEmploymentItem {...resp} />
						))}
					</>
				)}
			</div>
		</>
	)
}
