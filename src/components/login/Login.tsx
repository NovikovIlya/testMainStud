
import { Form, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { IError } from '../../api/types'
import logo from '../../assets/images/group.png'
import { useLoginMutation } from '../../store/api/authApiSlice'
import { setCredentials } from '../../store/reducers/authSlice'
import { BackMainPage } from '../BackMainPage'

import { Buttons } from './Buttons'
import { Inputs } from './Inputs'
import { useAppDispatch } from '../../store'

import { block } from '../dnd/constant'
import { useLocalStorageState } from 'ahooks'
import { useGetInfoUserQuery } from '../../store/api/formApi'
import { useCheckIsEmployeeQuery } from '../../store/api/practiceApi/contracts'
import { useGetRoleQuery } from '../../store/api/serviceApi'

const { Title } = Typography

export const Login = () => {
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { t, i18n } = useTranslation()
	// const dispatch = useDispatch()
	const [login,{ data:dataLogin,isSuccess, isLoading }] = useLoginMutation()

	const [error, setError] = useState<IError | null>(null)
	const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const paramValue = searchParams.get('lan');
	const {data:dataSubRole,isSuccess:isSuccessSubRole} = useGetRoleQuery(null,{skip:!isSuccess})
	const [message, setMessage] = useLocalStorageState<any>(
		'typeAcc',
		{
		  defaultValue: 'STUD',
		},
	);
	const [subRole, setSubrole] = useLocalStorageState<any>(
		'subRole',
		{
		  defaultValue: '',
		},
	);
	console.log('dataSubRoledataSubRoledataSubRole',dataSubRole)
	const dispatch = useAppDispatch()


	useEffect(()=>{
		document.title = 'Казанский Федеральный Университет'

		if(paramValue==='eng'){
			i18n.changeLanguage('en')
		}
	},[])

	useEffect(() => {
		if (isSuccess) {
			const type = dataLogin.user.roles.find((item:any) => item.login === form.getFieldValue('email')||item.email===form.getFieldValue('email'))?.type
			console.log('type',type)
			// dispatch(setMainRole(type))
			setMessage(type) // mainRole
			if(type==='EMPL'){
			    
			}
			navigate('/user') // Редирект на компонент User
		}
	}, [isSuccess]) 

	useEffect(()=>{
		if(isSuccessSubRole){
			console.log('dataSubRole',dataSubRole)
			// setSubrole(dataSubRole ? dataSubRole : '')
		}
	},[isSuccessSubRole])

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
			localStorage.setItem('password', JSON.stringify(values.password))
			localStorage.setItem('access', JSON.stringify(userData.accessToken))
			localStorage.setItem('refresh', JSON.stringify(userData.refreshToken))
			// navigate('/user')
		} catch (e: any) {
			console.log(e)
			setError(e.data)
		}
	}

	return (
		<div className="flex flex-col items-center min-h-screen">
			<BackMainPage notAuth={true}/>
			<div className="flex flex-row justify-center gap-24 text-base max-xl:gap-4 max-lg:flex-col max-lg:items-center h-full w-full">
				<Form
				    form={form}
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