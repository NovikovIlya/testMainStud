import { useLocalStorageState } from 'ahooks'
import { Spin } from 'antd'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import i18n from '../../18n'
import { P2 } from '../../models/redirect'
import { useRedirectMutation } from '../../store/api/authApiSlice'
import { setCredentials } from '../../store/reducers/authSlice'

export const Redirect = () => {
	const params = useParams()
	const [redirect] = useRedirectMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [info, setInfo] = useLocalStorageState<any>('info', {
		defaultValue: ''
	})
	const [href, setHref] = useLocalStorageState<any>('href', {
		defaultValue: ''
	})
	const searchParams = new URLSearchParams(location.search)
	const paramValue = searchParams.get('lan')

	async function redirectSuccess(p2: P2) {
		try {
			console.log('p22222222222', p2)
			const userData = await redirect(p2).unwrap()
			dispatch(setCredentials({ ...userData }))
			//так как s_id и h_id доступны из старого лк, то заново в куки их добавлять не нужно

			// document.cookie = `refresh=${
			//     userData.refreshToken
			// }; max-age=31536000; domain=${
			//     document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			// }; path=/; samesite=strict`
			// document.cookie = `a_id=${
			//     userData.user.allId
			// }; max-age=31536000; domain=${
			//     document.domain !== 'localhost' ? 'kpfu.ru' : 'localhost'
			// }; path=/; samesite=strict`
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
			setInfo(userData)
			setHref(userData?.user?.filialType)
			localStorage.setItem('user', JSON.stringify(userData.user))
			localStorage.setItem('access', JSON.stringify(userData.accessToken))
			localStorage.setItem('refresh', JSON.stringify(userData.refreshToken))
			navigate('/user')
			console.log(userData.user)
		} catch (e: any) {
			console.log('ошибка', e)
		}
	}

	useEffect(() => {
		console.log('p2222000000000022222222')
		localStorage.setItem('typeAcc', 'STUD')
		const p_2 = params.id
		const p2 = { p2: p_2 }
		redirectSuccess(p2)
	}, [])

	useEffect(() => {
		if (paramValue === 'eng') {
			i18n.changeLanguage('en')
		}
	}, [])

	return (
		<div className={'w-full h-screen flex items-center justify-center'}>
			<div className={'flex flex-col gap-5'}>
				<Spin size={'large'} />
				<span>{i18n?.language === 'en' ? 'Redirection in progress' : 'Выполняется переадресация'}</span>
			</div>
		</div>
	)
}
