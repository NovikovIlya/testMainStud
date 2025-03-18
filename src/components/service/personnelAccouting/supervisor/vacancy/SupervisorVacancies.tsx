import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useGetSupervisorVacancyQuery, useLazyGetSupervisorVacancyQuery } from '../../../../../store/api/serviceApi'
import { VacancyItemType } from '../../../../../store/reducers/type'

import SupervisorVacancyItem from './SupervisorVacancyItem'

export const SupervisorVacancies = () => {
	const [requestData, setRequestData] = useState<{
		page: number
	}>({
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [vacancies, setVacancies] = useState<VacancyItemType[]>([])

	const [getVacancies, getVacanciesStatus] = useLazyGetSupervisorVacancyQuery()

	useEffect(() => {
		const lowerObserver = new IntersectionObserver(entries => {
			const target = entries[0]
			if (target.isIntersecting) {
				console.log('I see the depths of hell below')
				setIsBottomOfCatalogVisible(true)
			}
			if (!target.isIntersecting) {
				setIsBottomOfCatalogVisible(false)
			}
		})

		if (catalogBottomRef.current) {
			lowerObserver.observe(catalogBottomRef.current)
		}

		return () => {
			if (catalogBottomRef.current) {
				lowerObserver.unobserve(catalogBottomRef.current)
			}
		}
	}, [vacancies.length])

	useEffect(() => {
		if (requestData.page === 0) {
			getVacancies(requestData.page)
				.unwrap()
				.then(res => {
					setVacancies(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getVacancies(requestData.page)
				.unwrap()
				.then(res => {
					setVacancies(prev => [...prev, ...res.content])
					res.content.length === 0 && setShowSpin(false)
					setBlockPageAddition(false)
				})
		}
	}, [requestData])

	useEffect(() => {
		if (isBottomOfCatalogVisible) {
			if (!blockPageAddition) {
				setRequestData(prev => ({ ...prev, page: prev.page + 1 }))
			}
		}
	}, [isBottomOfCatalogVisible])

	if (getVacanciesStatus.isLoading) {
		return (
			<>
				<div className="w-full h-full flex items-center">
					<div className="text-center ml-auto mr-auto">
						<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<div className="pl-[54px] pr-[54px] pt-[120px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Вакансии</h1>
				<div className="mt-[60px] ml-[20px] flex">
					<h3 className="w-[238px] shrink-0 font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Должность
					</h3>
					<div className="ml-[30px] flex gap-[40px]">
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">Опыт работы</h3>
						<h3 className="w-[104px] font-content-font font-normal text-[14px]/[14px] text-text-gray">График работы</h3>
					</div>
					<h3 className="ml-[140px] font-content-font font-normal text-[14px]/[14px] text-text-gray">
						Заработная плата
					</h3>
				</div>
				<div className="mt-[16px] mb-[50px] flex flex-col w-full gap-[10px]">
					{getVacanciesStatus.isFetching && requestData.page === 0 && showSpin ? (
						<>
							{' '}
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						</>
					) : (
						<>
							{' '}
							{vacancies.map(vac => (
								<SupervisorVacancyItem {...vac} key={vac.id} />
							))}
							{getVacanciesStatus.isFetching && requestData.page > 0 && showSpin && (
								<div className="text-center ml-auto mr-auto mb-[3%]">
									<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
								</div>
							)}
							<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
						</>
					)}
				</div>
			</div>
		</>
	)
}
