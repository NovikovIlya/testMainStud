import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../../store'
import { usePostInfoUserMutation } from '../../../../store/api/formApi'
import { setForm } from '../../../../store/creators/MainCreators'
import { blue307 } from '../../../../utils/color'

export const Buttons = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRole = useAppSelector(state => state.auth.user?.roles[0].type)
	const data = useAppSelector(state => state.Form)
	const [postUser] = usePostInfoUserMutation()
	const { t } = useTranslation()
	const handleCancel = () => {
		navigate('/infoUser')
	}
	const handleOk = async () => {
		postUser(data)
		if (userRole === 'GUEST') navigate('/user')
		else navigate('/documents')
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
					className={`w-[200px] font-bold h-[50px] rounded-full border-[${blue307}] text-[${blue307}]`}
				>
					{t('back')}
				</Button>
				<Button
					onClick={handleOk}
					type="primary"
					className="w-[200px] font-bold h-[50px] rounded-full"
				>
					{t('next')}
				</Button>
			</div>
			<Button
				onClick={handleSkip}
				type="text"
				className="rounded-full w-[200px] h-[50px] mt-8"
			>
				{t('fillLater')}
			</Button>
		</div>
	)
}
