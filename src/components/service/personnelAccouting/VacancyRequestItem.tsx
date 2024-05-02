import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLazyGetVacancyViewQuery } from '../../../store/api/serviceApi'
import { setRequestId } from '../../../store/reducers/CurrentRequestSlice'
import { setCurrentVacancy } from '../../../store/reducers/CurrentVacancySlice'

export const VacancyRequestItem = (props: {
	vacancyTitle: string
	action: string
	vacancyId: number
	requestId: number
}) => {
	const [getVacancy, result] = useLazyGetVacancyViewQuery()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<>
			<div className="w-full mb-[12px] flex justify-between items-center bg-white shadow-custom-shadow pl-[20px] pr-[55px] pt-[20px] pb-[20px]">
				<p className="w-[388px]">{props.vacancyTitle}</p>
				<p className="w-[388px] ml-[60px]">
					{props.action === 'UPDATE'
						? 'Редактирование'
						: props.action === 'CREATE'
						? 'Создание'
						: 'Удаление'}
				</p>
				<Button
					// onClick={() => {
					// 	props.action === 'CREATE'
					// 		? navigate(`/services/personnelaccounting/request/create`)
					// 		: props.action === 'UPDATE'
					// 		? navigate('/services/personnelaccounting/request/update')
					// 		: getVacancy(props.vacancyId)
					// 				.unwrap()
					// 				.then(result => {
					// 					dispatch(setCurrentVacancy(result))
					// 					dispatch(setRequestId(props.requestId))
					// 					console.log(result)
					// 					console.log(result.acf.responsibilities)
					// 					navigate('/services/personnelaccounting/request/delete')
					// 				})
					// }}
					onClick={
						props.action === 'CREATE'
							? () => {
									dispatch(setRequestId(props.requestId))
									navigate(`/services/personnelaccounting/request/create`)
							  }
							: props.action === 'UPDATE'
							? () => {
									dispatch(setRequestId(props.requestId))
									navigate(`/services/personnelaccounting/request/update`)
							  }
							: () => {
									getVacancy(props.vacancyId)
										.unwrap()
										.then(result => {
											dispatch(setCurrentVacancy(result))
											dispatch(setRequestId(props.requestId))
											console.log(result)
											console.log(result.acf.responsibilities)
											navigate('/services/personnelaccounting/request/delete')
										})
							  }
					}
					className="font-content-font font-normal text-black text-[16px]/[16px] rounded-[54.5px] py-[8px] px-[24px] border-black"
				>
					Подробнее
				</Button>
			</div>
		</>
	)
}
