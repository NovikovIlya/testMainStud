import { LoadingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Modal, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import { SearchInputIconSvg } from '../../../../../assets/svg/SearchInputIconSvg'
import { SuccessModalIconSvg } from '../../../../../assets/svg/SuccessModalIconSvg'
import { useLazyGetTestResultsQuery, useSetTestResultSignedMutation } from '../../../../../store/api/serviceApi'
import { SignedItemType } from '../../../../../store/reducers/type'
import { useAlert } from '../../../../../utils/Alert/AlertMessage'

export const TestResults = () => {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')

	const { openAlert } = useAlert()

	const [requestData, setRequestData] = useState<{
		query: string
		page: number
	}>({
		query: '',
		page: 0
	})

	const [showSpin, setShowSpin] = useState<boolean>(true)

	const [blockPageAddition, setBlockPageAddition] = useState<boolean>(true)
	const [isBottomOfCatalogVisible, setIsBottomOfCatalogVisible] = useState<boolean>(true)
	const catalogBottomRef = useRef<null | HTMLDivElement>(null)
	const [stages, setStages] = useState<SignedItemType[]>([])

	const [triggerSearch, { data: searchData, isLoading: isSearchLoading, isFetching: isSearchFetching }] =
		useLazyGetTestResultsQuery()

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
	}, [stages])

	useEffect(() => {
		if (requestData.page === 0) {
			triggerSearch({
				signed: false,
				query: requestData.query,
				page: 0
			})
				.unwrap()
				.then(res => {
					setStages(res.content)
					setBlockPageAddition(false)
				})
		} else {
			triggerSearch({
				signed: false,
				query: requestData.query,
				page: requestData.page
			})
				.unwrap()
				.then(res => {
					setStages(prev => [...prev, ...res.content])
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

	const [setSeekerSigned, { isLoading: setSeekerSignedLoading }] = useSetTestResultSignedMutation()

	useEffect(() => {
		const timeout = setTimeout(() => {
			setRequestData({ query: searchQuery, page: 0 })
		}, 500)
		return () => {
			clearTimeout(timeout)
		}
	}, [searchQuery])

	const handleSearchChange = (e: any) => {
		setBlockPageAddition(true)
		setSearchQuery(e.target.value)
	}

	const TestResultItem = (props: SignedItemType) => {
		return (
			<>
				<ApproveModal id={props.id}></ApproveModal>
				<div className="w-[100%] h-[80px] bg-white flex flex-row items-center">
					<div className="ml-[1.5%] w-[62%] flex flex-row">
						<span className="w-[38%] text-[16px] text-[##000000] font-normal">
							{props.seeker.lastname + ' ' + props.seeker.firstname + ' ' + props.seeker.middlename}
						</span>
						<span className="w-[54%] text-[16px] text-[##000000] font-normal">{props.post}</span>
						<span className="w-[8%] text-[16px] text-[##000000] font-normal">
							{props.testPassed ? 'Пройдено' : 'Не пройдено'}
						</span>
					</div>
					<div className="w-[36.5%] flex ">
						<button
							className=" hover:opacity-[100%] opacity-[80%] ml-[45%] gap-[12px] text-[16px] flex border-[1px] border-solid black cursor-pointer bg-white px-[24px] py-[8px] rounded-[5px]"
							onClick={() => {
								setIsApproveModalOpen(true)
							}}
						>
							Подписано
						</button>
					</div>
				</div>
			</>
		)
	}

	const ApproveModal = (props: { id: number }) => {
		return (
			<>
				<ConfigProvider
					theme={{
						token: {
							boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
						}
					}}
				>
					<Modal
						centered
						open={isApproveModalOpen}
						onCancel={() => {
							setIsApproveModalOpen(false)
						}}
						title={null}
						footer={null}
						width={407}
					>
						<div className="flex flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]">
							<p className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
								Вы действительно хотите отметить, что соискатель подписал все необходимые документы?
							</p>
							<div className="flex flex-row gap-[12px] px-[20px]">
								<Button
									className="rounded-[54.5px] border-black text-[14px] h-[40px] w-full py-[13px]"
									type="default"
									onClick={() => {
										setIsApproveModalOpen(false)
									}}
								>
									Нет
								</Button>
								<Button
									className="rounded-[54.5px] text-[14px] h-[40px] w-full py-[13px]"
									type="primary"
									onClick={() => {
										try {
											setIsApproveModalOpen(false)
											setSeekerSigned({ subStageId: props.id })
										} catch (error: any) {
											openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
										}
									}}
								>
									Да
								</Button>
							</div>
						</div>
					</Modal>
				</ConfigProvider>
			</>
		)
	}

	const SuccessModal = () => {
		return (
			<>
				<ConfigProvider
					theme={{
						token: {
							boxShadow: '0 0 19px 0 rgba(212, 227, 241, 0.6)'
						}
					}}
				>
					<Modal
						centered
						open={isSuccessModalOpen}
						onCancel={() => {
							setIsSuccessModalOpen(false)
						}}
						title={null}
						footer={null}
						width={407}
					>
						<div className="flex items-center justify-center flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]">
							<SuccessModalIconSvg></SuccessModalIconSvg>
							<p className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
								Соискатель успешно перемещëн в сервис "Подписанные"
							</p>
							<Button
								className="rounded-[54.5px] text-[14px] h-[40px] w-full py-[13px]"
								type="primary"
								onClick={() => {
									setIsSuccessModalOpen(false)
								}}
							>
								Ок
							</Button>
						</div>
					</Modal>
				</ConfigProvider>
			</>
		)
	}

	const ItemsContainer = () => {
		if (isSearchLoading) {
			return (
				<>
					<div className="w-full min-h-[56vh] flex items-center">
						<div className="text-center ml-auto mr-auto">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							<p className="font-content-font font-normal text-black text-[18px]/[18px]">Идёт загрузка...</p>
						</div>
					</div>
				</>
			)
		}

		return (
			<div className="mt-[16px] gap-[12px] flex flex-col">
				{isSearchFetching && requestData.page === 0 && showSpin ? (
					<>
						{' '}
						<div className="text-center ml-auto mr-auto mb-[3%]">
							<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
						</div>
					</>
				) : (
					<>
						{' '}
						<div className="flex flex-col gap-[12px]">
							{stages.map(item => (
								<TestResultItem {...item} key={item.id}></TestResultItem>
							))}
						</div>
						{isSearchFetching && requestData.page > 0 && showSpin && (
							<div className="text-center ml-auto mr-auto mb-[3%]">
								<Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />}></Spin>
							</div>
						)}
						<div className="h-[1px]" ref={catalogBottomRef} key={'catalog_bottom_key'}></div>
					</>
				)}
			</div>
		)
	}

	if (isSearchLoading) {
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
			<SuccessModal></SuccessModal>
			<div className="w-full px-[53px] pt-[140px] flex flex-col">
				<h2 className="text-[28px] text-black font-normal">Результаты тестов</h2>
				<label className="relative mt-[52px] flex flex-row">
					<button className="absolute h-[20px] w-[20px] left-[16px] top-[7px] p-[2px] border-none bg-white cursor-auto rounded-[10%]">
						<SearchInputIconSvg />
					</button>
					<input
						type="text"
						className="text-[16px] focus:outline-0 h-[32px] w-[500px] border-[#0000001A] border-[1px] pl-[46px] px-[17px] rounded-[5px]"
						placeholder="Поиск по ФИО"
						value={searchQuery}
						onChange={handleSearchChange}
					/>
				</label>
				<div>
					<div className=" flex flex-row mt-[42px]">
						<div className="ml-[1.5%] w-[62%] flex flex-row">
							<span className="w-[38%] text-[14px] text-[#626364] font-normal">Соискатель</span>
							<span className="w-[54%] text-[14px] text-[#626364] font-normal">Должность</span>
							<span className="w-[8%] text-[14px] text-[#626364] font-normal">Результат</span>
						</div>
						<div className="w-[36.5%]"></div>
					</div>
					<ItemsContainer></ItemsContainer>
				</div>
			</div>
		</>
	)
}
