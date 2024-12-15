import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../assets/svg/DeleteSvg'
import { WarningModalIconSvg } from '../../../assets/svg/WarningModalIconSvg'
import { useDeleteReserveRespondMutation } from '../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'
import { useAlert } from '../../../utils/Alert/AlertMessage'

export const ReserveItem = (props: {
	id: number
	name: String | undefined
	respondDate: string
	refetch: Function
	post: string
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isModalOpen, setModalOpen] = useState(false)
	const [deleteVacancy, deleteResult] = useDeleteReserveRespondMutation()
	const { openAlert } = useAlert()
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
					bodyStyle={{ padding: 53 }}
					centered
					open={isModalOpen}
					onCancel={() => {
						setModalOpen(false)
					}}
					title={null}
					footer={null}
					width={407}
				>
					<div className="w-full flex justify-center">
						<WarningModalIconSvg />
					</div>
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center mt-[22px]">
						Вы действительно хотите удалить отклик?
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto w-full rounded-[54.5px] text-black font-content-font font-medium text-[16px]/[20px] border-black h-[40px]"
							onClick={() => {
								setModalOpen(false)
							}}
						>
							Оставить
						</Button>
						<button
							className="cursor-pointer flex items-center justify-center border-[1px] border-solid outline-0 border-[#FF5A5A] hover:border-[#FF8181] text-white rounded-[54.5px] bg-[#FF5A5A] hover:bg-[#FF8181] text-[14px] h-[40px] w-full py-[13px]"
							onClick={async () => {
								try {
									deleteVacancy(props.id)
										.unwrap()
										.then(() => {
											setModalOpen(false)
											props.refetch()
										})
									openAlert({ type: 'success', text: 'Резюме успешно удалено.' })
								} catch (error: any) {
									openAlert({ type: 'error', text: 'Извините, что-то пошло не так...' })
								}
							}}
						>
							Удалить
						</button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="w-full mb-[12px] flex items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[30%]">{props.post}</p>
				<p className="ml-[5%] w-[20%]">{props.name}</p>
				<p className="ml-[5%] w-[8%]">{props.respondDate.split('-').reverse().join('.')}</p>
				<Button
					onClick={() => {
						dispatch(setCurrentResponce(props.id))
						navigate('services/personnelaccounting/reserve/fullinfo')
					}}
					className="ml-[10%] max-w-[15%] font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
				<Button
					className="ml-auto max-w-[5%]"
					onClick={() => {
						setModalOpen(true)
					}}
					type="text"
					icon={<DeleteSvg />}
				/>
			</div>
		</>
	)
}
