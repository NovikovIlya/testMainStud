import { GlobalOutlined } from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Button, Form, Modal, Radio, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { IError } from '../../api/types'
import logo from '../../assets/images/logoTwo.png'
import { useAppDispatch, useAppSelector } from '../../store'
import { useLoginMutation } from '../../store/api/authApiSlice'
import { setCredentials } from '../../store/reducers/authSlice'
import { BackMainPage } from '../BackMainPage'

import { Buttons } from './Buttons'
import { Inputs } from './Inputs'

const { Title } = Typography

export const Login = () => {
	const [form] = Form.useForm()
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false)
	const accessToken = useAppSelector(state => state.auth.accessToken)
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
	const [login, { data: dataLogin, isSuccess, isLoading }] = useLoginMutation()
	const [error, setError] = useState<IError | null>(null)
	const location = useLocation()
	const searchParams = new URLSearchParams(location.search)
	const paramValue = searchParams.get('lan')
	const [info, setInfo] = useLocalStorageState<any>('info', {
		defaultValue: ''
	})
	const [href, setHref] = useLocalStorageState<any>('href', {
		defaultValue: ''
	})
	const [message, setMessage] = useLocalStorageState<any>('typeAcc', {
		defaultValue: 'STUD'
	})
	const [subRole, setSubrole] = useLocalStorageState<any>('subRole', {
		defaultValue: ''
	})

	const dispatch = useAppDispatch()

	useEffect(() => {
		document.title = 'Казанский Федеральный Университет'

		if (paramValue === 'eng') {
			i18n.changeLanguage('en')
		}
	}, [])

	useEffect(() => {
		if (isSuccess) {
			const type = dataLogin.user.roles.find(
				(item: any) => item.login === form.getFieldValue('email') || item.email === form.getFieldValue('email')
			)?.type
			console.log('type', type)
			// dispatch(setMainRole(type))
			setMessage(type) // mainRole
			if (type === 'EMPL') {
			}
			navigate('/user') // Редирект на компонент User
		}
	}, [isSuccess])

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			const userData = await login({
				username: values.email,
				password: values.password
			}).unwrap()
			dispatch(setCredentials({ ...userData }))
			document.cookie = `refresh=${userData.refreshToken}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `s_id=${userData.user.sessionId}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `h_id=${userData.user.sessionHash}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `a_id=${userData.user.allId}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`

			localStorage.setItem('user', JSON.stringify(userData.user))
			localStorage.setItem('password', JSON.stringify(values.password))
			localStorage.setItem('access', JSON.stringify(userData.accessToken))
			localStorage.setItem('refresh', JSON.stringify(userData.refreshToken))
			setInfo(userData)
			setHref(userData?.user?.filialType)
			// navigate('/user')
		} catch (e: any) {
			console.log(e)
			setError(e.data)
		}
	}

	useEffect(() => {
		if (accessToken) {
			navigate('/user')
		}
	}, [accessToken, navigate])

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
		setSelectedLanguage(language)
		setIsLanguageModalOpen(false)
	}

	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

	return (
		<div className="flex flex-col items-center min-h-screen ">
			<BackMainPage className="" notAuth={true} />
			<div className="flex   justify-center gap-24 text-base max-xl:gap-4 items-center  w-full min-h-screen">
				<Form
					form={form}
					name="login"
					className={`min-w-[400px] rounded-lg shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] p-6 mb-4 mx-2 ${
						isMobile ? 'scale-[2.85]' : ''
					}   `}
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Title level={3} className="mb-[20px] text-start text-2xl font-bold">
						{t('authorization')}
					</Title>
					<Inputs error={error!} />
					<Buttons isLoading={isLoading} />
				</Form>
				{isMobile ? (
					''
				) : (
					<div className="flex items-start items-center">
						<img className="max-lg:hidden w-[400px] h-[400px]" src={logo} alt="group" />
					</div>
				)}
			</div>
			{isMobile ? (
				<Button
					onClick={() => setIsLanguageModalOpen(true)}
					className="scale-[2.8] mt-[-150px]"
					type="default"
					size="large"
				>
					{t('selectLanguage')}
				</Button>
			) : (
				''
			)}
			<Modal
				className="pt-4"
				open={isLanguageModalOpen}
				onCancel={() => setIsLanguageModalOpen(false)}
				footer={null}
				centered
				width="100%"
				height={'100vh'}
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
		</div>
	)
}
