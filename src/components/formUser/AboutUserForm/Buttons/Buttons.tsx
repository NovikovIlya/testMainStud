import { Button } from 'antd';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import { IinfoForm } from '../../../../api/types'
import { useAppSelector } from '../../../../store'
import { formSuccess } from '../../../../store/reducers/FormReducer'

interface IButProps {
	formData: IinfoForm
}

export const Buttons: FC<IButProps> = ({ formData }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRole = useAppSelector(state => state.Form.role)

	const handleCancel = () => {
		navigate('/infoUser')
	}
	const handleOk = () => {
		saveInStore()
		if (userRole === 'guest') navigate('user')
		else navigate('/documents')
	}
	const saveInStore = () => {
		if (formData.infoForm.gender !== '') {
			dispatch(formSuccess(formData))
		}
	}
	const handleSkip = () => {
		navigate('/user')
	}
	return (
		<div className="w-full flex flex-col items-center">
			<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
				<Button
					onClick={handleCancel}
					type="default"
					className="w-[200px] font-bold h-[50px] rounded-full border-[#3073D7] text-[#3073D7]"
				>
					Назад
				</Button>
				<Button
					onClick={handleOk}
					type="primary"
					className="w-[200px] font-bold h-[50px] rounded-full"
				>
					Далее
				</Button>
			</div>
			<Button
				onClick={handleSkip}
				type="text"
				className="rounded-full w-[200px] h-[50px] mt-8"
			>
				Заполнить позже
			</Button>
		</div>
	)
}