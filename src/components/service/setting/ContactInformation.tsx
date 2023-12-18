import { Button, Input } from 'antd'
import { useState } from 'react'

import {
	useGetEmailQuery,
	useVerifyAccMutation
} from '../../../store/api/serviceApi'

export const ContactInformation = () => {
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const { data } = useGetEmailQuery()
	const [postEmail] = useVerifyAccMutation()

	const onSubmitEmail = () => {
		postEmail({ email })
	}

	const onSubmitPhone = () => {}

	return (
		<section className="max-w-2xl">
			<h3 className="text-black text-2xl font-bold leading-normal">
				Контактные данные
			</h3>
			<article className=" mt-10">
				<h1 className="text-black text-sm font-bold">
					Основные контактные данные
				</h1>
				<article className="mt-7">
					<h1 className="opacity-80 text-black text-sm font-normal">
						Электронная почта
					</h1>
					<Input
						value={email}
						onChange={e => setEmail(e.target.value)}
						size="large"
						className="mt-2.5"
						placeholder="PerelmanGYA@stud.kpfu.ru"
					/>
					<section>
						<h1 className="opacity-40 text-black text-base font-normal">
							Необходимо подтвердить номер, нажав на кнопку ниже
						</h1>
						<Button
							className="bg-transparent border-black !rounded-full mt-4"
							size="large"
							onClick={onSubmitEmail}
						>
							Подтвердить
						</Button>
					</section>
				</article>
				<article className="mt-7 mb-2.5">
					<h1 className="opacity-80 text-black text-sm font-normal">Телефон</h1>
					<Input
						value={phone}
						onChange={e => setPhone(e.target.value)}
						size="large"
						className="mt-2.5"
						placeholder="+7 999 898-88-99"
					/>
					<section>
						<h1 className="opacity-40 text-black text-base font-normal">
							Необходимо подтвердить номер, нажав на кнопку ниже
						</h1>
						<Button
							className="bg-transparent border-black !rounded-full mt-4"
							size="large"
							onClick={onSubmitPhone}
						>
							Подтвердить
						</Button>
					</section>
				</article>
			</article>
		</section>
	)
}
