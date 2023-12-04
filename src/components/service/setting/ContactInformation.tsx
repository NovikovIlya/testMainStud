import { Button, Input } from 'antd'
import { useState } from 'react'
import uuid from 'react-uuid'

export const ContactInformation = () => {
	const [additionalInformation, setAdditionalInformation] = useState<
		JSX.Element[]
	>([])
	const handleAdditionalInformation = () => {
		setAdditionalInformation(prev => [...prev, render])
	}
	const handleDeleteAdditionalInformation = () => {
		setAdditionalInformation(prev => {
			prev.pop()
			return [...prev]
		})
	}
	var render = (
		<article className=" mt-10" key={uuid()}>
			<h1 className="text-black text-sm font-bold">
				Дополнительные контактные данные
			</h1>
			<article className="mt-7">
				<h1 className="opacity-80 text-black text-sm font-normal">
					Электронная почта
				</h1>
				<Input
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
					>
						Подтвердить
					</Button>
				</section>
			</article>
			<article className="mt-7 mb-2.5">
				<h1 className="opacity-80 text-black text-sm font-normal">Телефон</h1>
				<Input size="large" className="mt-2.5" placeholder="+7 999 898-88-99" />
				<section>
					<h1 className="opacity-40 text-black text-base font-normal">
						Необходимо подтвердить номер, нажав на кнопку ниже
					</h1>
					<Button
						className="bg-transparent border-black !rounded-full mt-4"
						size="large"
					>
						Подтвердить
					</Button>
				</section>
			</article>
		</article>
	)

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
						>
							Подтвердить
						</Button>
					</section>
				</article>
				<article className="mt-7 mb-2.5">
					<h1 className="opacity-80 text-black text-sm font-normal">Телефон</h1>
					<Input
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
						>
							Подтвердить
						</Button>
					</section>
				</article>
			</article>
			{additionalInformation}
			{!!additionalInformation.length && (
				<Button
					type="text"
					className="opacity-40 text-black text-sm font-normal mb-5 mt-7"
					onClick={handleDeleteAdditionalInformation}
				>
					Удалить
				</Button>
			)}
			<div className="w-full items-center gap-2  flex flex-col">
				<Button
					className="rounded-full text-center p-0 w-8 h-8 text-xl"
					type="primary"
					onClick={handleAdditionalInformation}
				>
					+
				</Button>
				<p className="opacity-40 text-center text-black text-sm font-normal ">
					дополнительный <br /> контакт
				</p>
			</div>
		</section>
	)
}
