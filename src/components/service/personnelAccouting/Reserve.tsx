import { LoadingOutlined } from '@ant-design/icons'
import { Radio, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { useLazyGetReservedResponcesQuery } from '../../../store/api/serviceApi'
import { VacancyRespondItemType } from '../../../store/reducers/type'

import { ReserveItem } from './ReserveItem'

export const Reserve = () => {
	const [requestData, setRequestData] = useState<{
		type: string
		page: number
	}>({
		type: '',
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [reserve, setReserve] = useState<VacancyRespondItemType[]>([])

	const [getResponds, getRespondsStatus] = useLazyGetReservedResponcesQuery()

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
	}, [reserve])

	useEffect(() => {
		if (requestData.page === 0) {
			getResponds({
				type: requestData.type,
				page: requestData.page
			})
				.unwrap()
				.then(res => {
					setReserve(res.content)
					setBlockPageAddition(false)
				})
		} else {
			getResponds({
				type: requestData.type,
				page: requestData.page
			})
				.unwrap()
				.then(res => {
					setReserve(prev => [...prev, ...res.content])
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

	if (getRespondsStatus.isLoading) {
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
			<div className="w-full pl-[52px] pr-[52px] pt-[60px] mt-[60px]">
				<h1 className="font-content-font font-normal text-black text-[28px]/[28px]">Резерв</h1>
				<Radio.Group
					className="mt-[52px] flex flex-wrap gap-[12px]"
					value={requestData.type}
					onChange={e => {
						setBlockPageAddition(true)
						setRequestData({ type: e.target.value, page: 0 })
						setShowSpin(true)
					}}
				>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.type === ''
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={''} className="hidden"></Radio>
						все
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.type === 'RESUME'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'RESUME'} className="hidden"></Radio>
						резюме, отправленное напрямую
					</label>
					<label
						className={`rounded-[54.5px] py-[8px] px-[16px] font-content-font cursor-pointer ${
							requestData.type === 'RESPOND'
								? 'text-white bg-dasha-blue'
								: 'text-black border-solid border-black border-[1px] hover:bg-white hover:border-dasha-light-blue hover:text-dasha-light-blue'
						} font-normal text-[16px]/[16px]`}
					>
						<Radio value={'RESPOND'} className="hidden"></Radio>
						резюме, отправленное на вакансию
					</label>
				</Radio.Group>
				<div className="w-full flex mt-[52px] mb-[16px] pl-[20px] pr-[55px]">
					<h3 className="w-[30%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Должность
					</h3>
					<h3 className="ml-[5%] w-[20%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Соискатель
					</h3>
					<h3 className="ml-[5%] w-[8%] font-content-font text-black font-normal text-[14px]/[14px] opacity-[60%]">
						Дата отклика
					</h3>
				</div>
				{getRespondsStatus.isFetching && requestData.page === 0 && showSpin ? (
					<>
						{' '}
						<div className="text-center ml-auto mr-auto mb-[3%]">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						</div>
					</>
				) : (
					<>
						{' '}
						{reserve.map(respond => (
							<ReserveItem
								id={respond.id}
								name={
									respond.userData?.lastname + ' ' + respond.userData?.firstname + ' ' + respond.userData?.middlename
								}
								respondDate={respond.respondDate}
								refetch={() => {
									setRequestData(prev => ({ ...prev, page: 0 }))
								}}
								post={respond.oldVacancyName ? respond.oldVacancyName : respond.desiredJob}
							/>
						))}
						{getRespondsStatus.isFetching && requestData.page > 0 && showSpin && (
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
