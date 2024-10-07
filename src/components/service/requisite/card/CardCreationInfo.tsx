import { Button, Spin } from 'antd'
import { setCurrentResponce } from '../../../../store/reducers/CurrentResponceSlice'
import { CardRequestItem } from './CardRequestItem'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../../../store'
import { useDispatch } from 'react-redux'
import { LoadingOutlined } from '@ant-design/icons'

export const CardCreationInfo = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const respondId = useAppSelector(state => state.currentResponce)
	const seekerName  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerName)
	const seekerVacancy  = useAppSelector(state => state.requisiteSeeker.currentRequisiteSeekerVacancy)

	return (
		<>
			<div className="w-full flex flex-col px-[53px] mt-[140px]">
				<h1 className="font-normal text-[28px]/[28px]">{seekerName}</h1>
				<Button
					type="default"
					className="max-w-[102px] mt-[20px] bg-[#F5F8FB] py-[8px] px-[24px] text-[#333333] border-[#333333] border-[1px] rounded-[54.5px] text-[16px]"
					onClick={() => {
						dispatch(setCurrentResponce(respondId.respondId))
						navigate('/services/personnelaccounting/requisite/card-creation/info/seekerinfo')
					}}
				>Резюме</Button>
				<h3 className="mt-[53px] text-[18px] font-normal">
					Вакансия: <span className="font-bold">{seekerVacancy}</span>
				</h3>
				<div className="mt-[40px] mb-[100px] gap-[12px] flex flex-col ">
					<CardRequestItem></CardRequestItem>
				</div>
			</div>
		</>
	)
}