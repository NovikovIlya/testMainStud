import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useLazyGetVacancyRequestsQuery } from '../../../store/api/serviceApi'
import { VacancyRequestItemType } from '../../../store/reducers/type'

import { VacancyRequestItem } from './VacancyRequestItem'

export const VacancyRequestsPage = () => {
	const [requestData, setRequestData] = useState<{
		page: number
		action: string
	}>({
		page: 0,
		action: 'все'
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [requests, setRequests] = useState<VacancyRequestItemType[]>([])

	const [getRequests, getRequestsStatus] = useLazyGetVacancyRequestsQuery()

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
	}, [requests])

	useEffect(() => {
		if (requestData.page === 0) {
			getRequests({ page: requestData.page, action: requestData.action })
				.unwrap()
				.then(res => {
					setRequests(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getRequests({ page: requestData.page, action: requestData.action })
				.unwrap()
				.then(res => {
					setRequests(prev => [...prev, ...res.content])
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

	if (getRequestsStatus.isLoading) {
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
			<div id="wrapper" className="pl-[54px] pr-[54px] pt-[60px] mt-[60px] w-full bg-content-gray">
				<h1 className="font-content-font font-normal text-[28px]/[28px] text-black">Заявки от руководилей</h1>
				<Radio.Group
					className="mt-[40px] flex gap-[12px]"
					value={requestData.action}
					onChange={e => {
						setRequestData({ page: 0, action: e.target.value })
					}}
				>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.action === 'все'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'все'} className="hidden"></Radio>
						все
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.action === 'UPDATE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'UPDATE'} className="hidden"></Radio>
						редактирование
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.action === 'CREATE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'CREATE'} className="hidden"></Radio>
						создание
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.action === 'DELETE'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'DELETE'} className="hidden"></Radio>
						удаление
					</label>
				</Radio.Group>
				<div className="flex mt-[60px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[40%] font-content-font font-normal text-[14px]/[14px] text-text-gray">Должность</h3>
					<h3 className="w-[10%] ml-[10%] font-content-font font-normal text-[14px]/[14px] text-text-gray">Заявка</h3>
				</div>
				{getRequestsStatus.isFetching && requestData.page === 0 && showSpin ? (
					<>
						{' '}
						<div className="text-center ml-auto mr-auto mb-[3%]">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						</div>
					</>
				) : (
					<>
						{' '}
						{requests.map(req => (
							<VacancyRequestItem
								vacancyTitle={req.vacancy.post}
								action={req.action}
								vacancyId={req.vacancy.id}
								requestId={req.id}
							/>
						))}
						{getRequestsStatus.isFetching && requestData.page > 0 && showSpin && (
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						)}
						<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
					</>
				)}
			</div>
		</>
	)
}
