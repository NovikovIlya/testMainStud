import { Button, Form, Modal, Radio, Space, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { IError, IRegForm } from '../../api/types'
import logo from '../../assets/images/group.png'
import { IRegProps } from '../../models/registration'
import { useAppSelector } from '../../store'
import { useRegisterMutation } from '../../store/api/authApiSlice'
import { BackMainPage } from '../BackMainPage'

import { Buttons } from './Buttons'
import { Inputs } from './Inputs'
import { Password } from './Password'

const { Title } = Typography

export const Registration: FC<IRegProps> = ({ changeEmail, email }) => {
	const navigate = useNavigate()
	const [error, setError] = useState<IError | null>(null)
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
	const { t, i18n } = useTranslation()
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
	const [check, setCheck] = useState(false)
	const accessToken = useAppSelector(state => state.auth.accessToken)

	const [register, { data: dataRegister, isLoading }] = useRegisterMutation()

	useEffect(() => {
		if (accessToken) {
			navigate('/user')
		}
	}, [accessToken, navigate])

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

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
		setSelectedLanguage(language)
		setIsLanguageModalOpen(false)
	}

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	return (
		<>
			<div className="flex flex-wrap justify-center items-center min-h-screen">
				<BackMainPage className="top-0" />
				<div className="flex mt-32  flex-row justify-between gap-24 text-base max-xl:gap-4 max-lg:flex-col  max-lg:items-center  items-center">
					<Form
						name="login"
						className={`max-w-[400px] p-2 max-sm:min-w-[345px] max-[321px]:min-w-[300px] rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] p-6 mb-4 ${
							isMobile ? 'scale-[2.85]' : ''
						} `}
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
					{isMobile ? (
						''
					) : (
						<div className="flex items-start mt-10">
							<img className="max-lg:hidden w-[400px] h-[400px]" src={logo} alt="group" />
						</div>
					)}
				</div>
			</div>
			{isMobile ? <div className="flex w-full justify-center">
				<Button
					onClick={() => setIsLanguageModalOpen(true)}
					className="scale-[2.8] mt-[-150px]"
					type="default"
					size="large"
				>
					{t('selectLanguage')}
				</Button>
			</div> : ""}
			<Modal
				open={isLanguageModalOpen}
				onCancel={() => setIsLanguageModalOpen(false)}
				footer={null}
				centered
				width="100%"
				height={'100vh'}
				className='pt-4'
			>
				<Radio.Group
					value={selectedLanguage}
					onChange={e => changeLanguage(e.target.value)}
					className="w-full flex justify-center mt-4 mb-4"
				>
					<Space className="flex flex-wrap" direction="vertical" size="large">
						<Radio.Button className="text-9xl w-full h-full" value="ru">
							Русский
						</Radio.Button>
						<Radio.Button className="text-9xl w-full h-full" value="en">
							English
						</Radio.Button>
					</Space>
				</Radio.Group>
			</Modal>
		</>
	)
}
