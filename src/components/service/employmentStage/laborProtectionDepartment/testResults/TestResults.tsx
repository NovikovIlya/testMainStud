import { LoadingOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Modal, Spin } from "antd"
import { useState, useEffect, useRef } from 'react'
import { SearchInputIconSvg } from "../../../../../assets/svg/SearchInputIconSvg"
import { useGetTestResultsQuery,
	useLazyGetTestResultsQuery,
	useSetTestResultSignedMutation
} from "../../../../../store/api/serviceApi"
import { SignedItemType } from "../../../../../store/reducers/type"
import { useAlert } from "../../../../../utils/Alert/AlertMessage"
import {SuccessModalIconSvg} from "../../../../../assets/svg/SuccessModalIconSvg"

export const TestResults = () => {

	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
	const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const [isSearching, setIsSearching] = useState(false)
	const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	const { openAlert } = useAlert()

	const { data: test_result_data = [], isLoading: loading, refetch } = useGetTestResultsQuery({signed: false, query: ""})

	const [triggerSearch, { data: searchData, isLoading: isSearchLoading }] = useLazyGetTestResultsQuery()

	const [setSeekerSigned] = useSetTestResultSignedMutation()

	useEffect(() => {

		if (searchTimeoutRef.current) {
			clearTimeout(searchTimeoutRef.current)
		}


		searchTimeoutRef.current = setTimeout(() => {
			setIsSearching(true)
			triggerSearch({ signed: false, query: searchQuery }).then(() => {
				setIsSearching(false)
			})
		}, 500)


		return () => {
			if (searchTimeoutRef.current) {
				clearTimeout(searchTimeoutRef.current)
			}
		}
	}, [searchQuery])

	const handleSearchChange = (e: any) => {
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
						<div className='flex items-center justify-center flex-col px-[15px] pt-[50px] pb-[30px] gap-[34px]'>
							<SuccessModalIconSvg></SuccessModalIconSvg>
							<p
								className="text-center font-content-font font-normal flex items-start text-black text-[16px]/[20px]">
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
		if (isSearching || isSearchLoading) {
			return (
				<>
					<div className="w-full min-h-[56vh] flex items-center">
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
			<div className="mt-[16px] gap-[12px] flex flex-col">
				{(searchData || test_result_data).map(item => (
					<TestResultItem {...item} key={item.id}></TestResultItem>
				))}
			</div>
		)
	}

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
			<SuccessModal></SuccessModal>
			<div className="w-full px-[53px] pt-[140px] flex flex-col">
				<h2 className="text-[28px] text-black font-normal">Результаты тестов</h2>
				<label className="relative mt-[52px] flex flex-row">
					<button
						className="absolute h-[20px] w-[20px] left-[16px] top-[7px] p-[2px] border-none bg-white cursor-auto rounded-[10%]">
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