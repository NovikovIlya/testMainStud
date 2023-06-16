import { Button } from 'antd'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IinfoForm } from '../../../../api/types'
import { formSuccess } from '../../../../store/reducers/FormReducer'

interface IButProps {
	formData: IinfoForm
}

export const Buttons: FC<IButProps> = ({ formData }) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		navigate('/documents')
		dispatch(formSuccess(formData))
	}
	return (
		<div>
			<div className="w-full flex justify-center items-center gap-[30px] mt-[60px]">
				<Button
					onClick={handleCancel}
					type="default"
					className="w-[200px] h-[50px] rounded-full border-[#3073D7] text-[#3073D7]"
				>
					Пропустить
				</Button>
				<Button
					onClick={handleOk}
					type="primary"
					className="w-[200px] h-[50px] rounded-full"
				>
					Далее
				</Button>
			</div>
		</div>
	)
}
