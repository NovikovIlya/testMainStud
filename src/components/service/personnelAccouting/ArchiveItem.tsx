import { Button, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { DeleteSvg } from '../../../assets/svg/DeleteSvg'
import { useDeleteRespondFromArchiveMutation } from '../../../store/api/serviceApi'
import { setCurrentResponce } from '../../../store/reducers/CurrentResponceSlice'

export const ArchiveItem = (props: {
	id: number
	name: String | undefined
	respondDate: string
	refetch: Function
	post: string
}) => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [isModalOpen, setModalOpen] = useState(false)
	const [deleteVacancy, deleteResult] = useDeleteRespondFromArchiveMutation()

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
					<p className="font-content-font font-normal text-black text-[16px]/[20px] text-center">
						Вы действительно хотите удалить резюме?
					</p>
					<div className="mt-[40px] flex gap-[12px]">
						<Button
							className="ml-auto"
							onClick={() => {
								setModalOpen(false)
							}}
						>
							Отменить
						</Button>
						<Button
							type="primary"
							className="rounded-[54.5px] mr-auto"
							onClick={() => {
								deleteVacancy(props.id)
									.unwrap()
									.then(() => {
										setModalOpen(false)
										props.refetch()
									})
							}}
						>
							Удалить
						</Button>
					</div>
				</Modal>
			</ConfigProvider>
			<div className="w-full mb-[12px] flex justify-between items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[250px]">{props.post}</p>
				<p>{props.name}</p>
				<p>{props.respondDate.split('-').reverse().join('.')}</p>
				<Button
					onClick={() => {
						dispatch(setCurrentResponce(props.id))
						navigate('services/personnelaccounting/archive/fullinfo')
					}}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
				<Button
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
