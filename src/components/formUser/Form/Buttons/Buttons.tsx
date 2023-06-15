import { Button, Form } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Buttons = () => {
	const navigate = useNavigate()

	const handleCancel = () => {
		navigate('/form')
	}
	const handleOk = () => {
		navigate('/documents')
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
