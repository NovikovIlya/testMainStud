import { Button, Typography } from 'antd'
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import { useState } from 'react'

import { useAppSelector } from '../../../store'
import {
	useGetPhoneUserQuery,
	usePostPhoneMutation
} from '../../../store/api/serviceApi'
import { SkeletonPage } from '../aboutMe/Skeleton'

export const ContactInformation = () => {
	const [phone, setPhone] = useState<undefined | string>('')
	const { data, isLoading } = useGetPhoneUserQuery()
	const email = useAppSelector(state => state.auth.user?.email)
	const [submit] = usePostPhoneMutation()
	const onSubmitPhone = () => submit({ phone })
	console.log('daisLoadingta',isLoading)
	// if (data === undefined || isLoading) return <SkeletonPage />

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
					<div className="bg-white p-2 rounded-md">
						<Typography.Text>{email}</Typography.Text>
					</div>
				</article>
				<article className="mt-7 mb-2.5">
					<h1 className="opacity-80 text-black text-sm font-normal">Телефон</h1>
					{data?.length ? (
						<div className="bg-white p-2 rounded-md">{data?.[0]}</div>
					) : (
						<>
							<FormItem name="phone" className="w-full">
								<PhoneInput
									size="large"
									className="w-full"
									enableSearch
									onChange={e => {
										const fullPhone = `${e.areaCode}${e.phoneNumber}`
										setPhone(fullPhone)
									}}
									value={phone}
								/>
							</FormItem>
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
						</>
					)}
				</article>
			</article>
		</section>
	)
}
