import { Form, Typography } from 'antd'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { IError, IRegForm } from '../../api/types'
import logo from '../../assets/images/group.png'
import { useRegisterMutation } from '../../store/api/authApiSlice'
import { BackMainPage } from '../BackMainPage'

import { Buttons } from './Buttons'
import { Inputs } from './Inputs'
import { Password } from './Password'
import { IRegProps } from '../../models/registration'

const { Title } = Typography


export const Registration: FC<IRegProps> = ({ changeEmail, email }) => {
	const navigate = useNavigate()
	const [error, setError] = useState<IError | null>(null)

	const { t } = useTranslation()
	const [check, setCheck] = useState(false)

	const [register,{data:dataRegister,isLoading}] = useRegisterMutation()

	const onFinish = async (values: IRegForm) => {
		try {
			await register({
				lastName: values.surname,
				password: values.password,
				firstName: values.name,
				email: values.email,
				agreement: 'true'
			}).unwrap()
			navigate('/registration/checkingEmail')
		} catch (e: any) {
			setError(e.data)
			console.error(e)
		}
	}

	return (
		<div className="flex flex-col items-center min-h-screen">
			<BackMainPage />
			<div className="flex flex-row justify-between gap-24 text-base max-xl:gap-4 max-lg:flex-col  max-lg:items-center min-h-screen items-center">
				<Form
					name="login"
					className="max-w-[400px] p-2 max-sm:min-w-[345px] max-[321px]:min-w-[300px] rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] p-6 mb-4"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Title level={3} className="mb-[20px] text-start text-2xl font-bold">
						{t('registration')}
					</Title>
					<Inputs email={email} error={error} changeEmail={changeEmail} />
					<Password error={error} />
					<Buttons isLoading={isLoading} check={check} setCheck={setCheck} />
				</Form>
				<div className="flex items-start mt-10">
					<img
						className="max-lg:hidden w-[400px] h-[400px]"
						src={logo}
						alt="group"
					/>
				</div>
			</div>
		</div>
	)
}
