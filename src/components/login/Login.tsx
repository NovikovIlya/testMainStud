import { Form, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { IError } from '../../api/types'
import logo from '../../assets/images/group.png'
import { useLoginMutation } from '../../store/api/authApiSlice'
import { setCredentials } from '../../store/reducers/authSlice'
import { BackMainPage } from '../BackMainPage'

import { Buttons } from './Buttons'
import { Inputs } from './Inputs'

const { Title } = Typography

export const Login = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const [login] = useLoginMutation()
	const [error, setError] = useState<IError | null>(null)

	useEffect(()=>{
		document.title = "Казанский Федеральный Университет"
	},[])

	const onFinish = async (values: { email: string; password: string }) => {
		try {
			const userData = await login({
				username: values.email,
				password: values.password
			}).unwrap()
			dispatch(setCredentials({ ...userData }))
			document.cookie = `refresh=${
				userData.refreshToken
			}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `s_id=${
				userData.user.sessionId
			}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `h_id=${
				userData.user.sessionHash
			}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`
			document.cookie = `a_id=${
				userData.user.allId
			}; max-age=31536000; domain=${
				document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			}; path=/; samesite=strict`

			localStorage.setItem('user', JSON.stringify(userData.user))
			localStorage.setItem('access', JSON.stringify(userData.accessToken))
			localStorage.setItem('refresh', JSON.stringify(userData.refreshToken))
			navigate('/user')
		} catch (e: any) {
			console.log(e)
			setError(e.data)
		}
	}

	return (
		<div className="flex flex-col items-center min-h-screen">
			<BackMainPage />
			<div className="flex flex-row justify-center gap-24 text-base max-xl:gap-4 max-lg:flex-col max-lg:items-center h-full w-full">
				<Form
					name="login"
					className="min-w-[400px] mx-2 max-sm:min-w-[345px] max-[321px]:min-w-[300px]"
					initialValues={{ remember: true }}
					onFinish={onFinish}
				>
					<Title className="mb-[20px] text-start text-2xl font-bold">
						{t('authorization')}
					</Title>
					<Inputs error={error!} />
					<Buttons />
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
