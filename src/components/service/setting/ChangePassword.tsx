import { Button, Input } from 'antd'
import React from 'react'

export const ChangePassword = () => {
	return (
		<section className="max-w-2xl">
			<h1 className="text-black text-2xl font-bold leading-normal">
				Изменить пароль
			</h1>
			<article className="mt-10">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Введите старый пароль
				</h1>
				<Input.Password
					value={''}
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
					size="large"
					className="mt-2"
					placeholder="Повторите пароль"
				/>
			</article>
			<Button
				className="bg-transparent border-black !rounded-full mt-4"
				size="large"
			>
				Подтвердить
			</Button>
		</section>
	)
}
