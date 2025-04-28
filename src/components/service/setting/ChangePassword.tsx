import { Button, Input } from 'antd'
import { useEffect, useState } from 'react'

import { useChangePasswordMutation } from '../../../store/api/serviceApi'

export const ChangePassword = () => {
	const [putPassword] = useChangePasswordMutation()
	const [password, setPassword] = useState<{
		oldPassword: string | undefined
		newPassword: string | undefined
		newEqualPassword: string | undefined
		error: any
		equal: boolean
	}>({
		oldPassword: undefined,
		newPassword: undefined,
		newEqualPassword: undefined,
		equal: true,
		error: null
	})

	useEffect(() => {
		if (password.newEqualPassword === password.newPassword) {
			setPassword(state => ({ ...state, equal: true }))
			setPassword(state => ({ ...state, error: null }))
		} else {
			setPassword(state => ({ ...state, equal: false }))
		}
	}, [password.newPassword, password.newEqualPassword, password.equal])

	const onSubmit = async () => {
		if (password.equal && password.newPassword && password.oldPassword) {
			await putPassword({
				newPassword: password.newPassword,
				oldPassword: password.oldPassword
			})
		} else {
			setPassword(state => ({ ...state, error: 'Fill all inputs' }))
		}
	}

	return (
		<section className="max-w-2xl pt-[70px] px-[40px]">
			<h1 className="text-black text-2xl font-bold leading-normal">
				Изменить пароль
			</h1>
			<article className="mt-10">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Введите старый пароль
				</h1>
				<Input.Password
					value={password.oldPassword}
					onChange={e =>
						setPassword(state => ({ ...state, oldPassword: e.target.value }))
					}
					size="large"
					className="mt-2"
					placeholder="Старый пароль"
				/>
			</article>
			<article className="mt-7">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Введите новый пароль
				</h1>
				<Input.Password
					value={password.newPassword}
					onChange={e =>
						setPassword(state => ({ ...state, newPassword: e.target.value }))
					}
					size="large"
					className="my-2"
					placeholder="Новый пароль"
				/>
				<p className="text-zinc-500 text-xs font-normal leading-normal">
					Пароль должен содержать от 8 символов, буквы верхнего и нижнего
					регистра, а также цифры
				</p>
			</article>
			<article className="mt-7">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Повторите новый пароль
				</h1>
				<Input.Password
					value={password.newEqualPassword}
					onChange={e =>
						setPassword(state => ({
							...state,
							newEqualPassword: e.target.value
						}))
					}
					size="large"
					className="mt-2"
					placeholder="Повторите пароль"
				/>
			</article>
			<Button
				onClick={onSubmit}
				className="bg-transparent border-black !rounded-full my-4"
				size="large"
			>
				Подтвердить
			</Button>
			{password.error && <p className="text-rose-500"> {password.error} </p>}
			{!password.equal && <p className="text-rose-500">Пароли не совподают!</p>}
		</section>
	)
}
