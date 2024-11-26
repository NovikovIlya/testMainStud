import { useInterval, useUpdateEffect } from 'ahooks'
import { Button, Form, Input, Modal, Result, Spin } from 'antd'
import PhoneInput from 'antd-phone-input'
import FormItem from 'antd/es/form/FormItem'
import { useState } from 'react'

import { useAppDispatch } from '../../../../store'
import { apiSlice } from '../../../../store/api/apiSlice'
import { apiSliceTeacher } from '../../../../store/api/apiSliceTeacher'
import {
	useDeleteAccMutation,
	useDeleteAccPhoneMutation,
	useFinalVerifyMutation,
	useFinalVerifyPhoneMutation,
	useGetEmailQuery,
	useGetPhoneUserQuery,
	usePostEmailMutation,
	usePostPhoneMutation,
	useVerifyAccMutation,
	useVerifyAccPhoneMutation
} from '../../../../store/api/serviceApi'
import { SkeletonPage } from '../../aboutMe/Skeleton'

import ContactDataBlock from './ContactDataBlock'
import NumberDataBloc from './NumberDataBloc'

export const NumberInformation = () => {
	const [form] = Form.useForm()
	const { data, isLoading,isError } = useGetPhoneUserQuery()
	const [postMail, { data: dataPost, isLoading: isLoadingPost }] = usePostPhoneMutation()
	const [sendVerify, { data: dataVer, isLoading: isLoadingVer, isError: isErrorVerif }] = useVerifyAccPhoneMutation()
	const [finalVerify, { data: dataFin, isLoading: isLoadingFin }] = useFinalVerifyPhoneMutation()
	const [deleteMail] = useDeleteAccPhoneMutation()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [idUser, setIdUser] = useState(null)
	const [count, setCount] = useState(0)
	const dispatch = useAppDispatch()


	useUpdateEffect(() => {
		if (dataVer) {
			setCount(dataVer.cooldownMs / 1000)
		}
	}, [dataVer])

	useInterval(() => {
			setCount(count - 1)
			// Интервал будет работать только когда модальное окно открыто и count > 0
		},isModalOpen && count > 0 ? 1000 : undefined)

	const onSubmitPhone2 = () => {
		if (data && data?.length > 10) {
			alert('Нельзя добавлять больше 10 почт.')
			return
		}
		const text = form.getFieldValue('inputText')
		if(!text){
			alert('Напишите телефон')
			return
		}
		postMail({ phone: text })
			.unwrap()
			.then(res => {	
				sendVerOne(res.id)
			})
			.catch(err => {
				alert('Ошибка, такой номер уже есть')
			})
			
			
		form.setFieldValue('inputText', '')
	}

	const handleDeleteEmail = (id: any) => {
		deleteMail(id)
	}
	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
		form.setFieldValue('code', '')
		setCount(0)
		dispatch(apiSlice.util.resetApiState())
	}

	const sendVer = (id: any) => {
		showModal()
		setIdUser(id)
		// отправить код
		sendVerify(id)
	}

	const sendVerOne = (id: any) => {
		showModal()
		setIdUser(id)
		setCount(60)
	
	}

	const finalFnVer = () => {
		const code = form.getFieldValue('code')

		if (!code) {
			alert('Введите код')
		}

		finalVerify({
			id: idUser,
			otp: code
		}).unwrap().then(res => {
			if(res.verified){
				alert('Номер подтвержден')
				handleCancel()
			}
			else{
				alert('Неверный код')
				handleCancel()
			}
		})
	}

	const sortedEmails = data?.slice().sort((a: any, b: any) => {
		return b.verified === a.verified ? 0 : b.verified ? 1 : -1
	})
	
	if(isError){
			return <div> <Result
			status="500"
			title="500"
			subTitle="Произошла ошибка, попробуйте пожалуйста позднее."
		
		/></div>}
	if (data === undefined || isLoading) return <SkeletonPage />

	return (
		<Form form={form} onFinish={onSubmitPhone2}>
			<section className="max-w-2xl mb-6">
				<article className=" mt-10">
					<NumberDataBloc
						isLoadingPost={isLoadingPost}
						sortedEmails={sortedEmails}
						sendVer={sendVer}
						handleDeleteEmail={handleDeleteEmail}
						showModal={showModal}
					/>
				</article>
			</section>
			<Modal   maskClosable={false}  title="Верификация телефона" footer={null} open={isModalOpen} onCancel={handleCancel}>
				{isErrorVerif ? (
					'Пожалуйста повторите позже, запрос на следующее подтвеждение будет доступен через 1 минуту'
				) : (
					<Spin spinning={isLoadingVer || isLoadingFin}>
						{count <= 0 ? (
							<div>{!isLoadingVer ? 'Время истекло, повторите попытку позже' : 'Идет загрузка...'}</div>
						) : (
							<>
								{dataFin?.verified ? (
									<div className="text-center">Верификация пройдена успешна!</div>
								) : (
									<>
										<p>Оставшееся время: {count}</p>
										<p className="mb-2">На ваш телефон будет произведен звонок с 4-х значным кодом! Впишите этот код в поле ниже:</p>
										<Form.Item name={'code'}>
											<Input.OTP length={4} />
										</Form.Item>
										<Button className="w-full" onClick={finalFnVer}>
											Подтвердить
										</Button>
									</>
								)}
							</>
						)}
					</Spin>
				)}
			</Modal>
		</Form>
	)
}
