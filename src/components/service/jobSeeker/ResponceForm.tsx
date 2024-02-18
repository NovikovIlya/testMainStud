import { Button, DatePicker, Form, Input, Modal, Radio, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useAppSelector } from '../../../store'
import { useGetCountriesQuery } from '../../../store/api/utilsApi'

export const ResponseForm = () => {
	const { t, i18n } = useTranslation()
	const { data: countries, isLoading: isLoadingCountry } = useGetCountriesQuery(
		i18n.language
	)
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [isAllDataSet, setIsAllDataSet] = useState(false)

	const user = useAppSelector(state => state.auth.user)
	const formData = useAppSelector(state => state.Form)

	const [gender, setGender] = useState<string>(formData.gender)
	const [name, setName] = useState(user?.firstname)
	const [surname, setSurname] = useState(user?.lastname)
	const [patronymic, setPatronymic] = useState(user?.middlename)
	const [birthday, setBirthday] = useState<dayjs.Dayjs>(
		dayjs(user?.birthday.split('.').join('-'), 'DD-MM-YYYY')
	)
	const [countryId, setCountryId] = useState(formData.countryId)
	const [phone, setPhone] = useState(user?.phone)
	const [email, setEmail] = useState(user?.email)

	console.log(user?.birthday.split('.').join('-'))

	return (
		<>
			<Button
				type="primary"
				onClick={() => {
					setIsFormOpen(true)
				}}
			>
				Откликнуться
			</Button>

			<Modal
				open={isFormOpen}
				title={null}
				footer={[
					isAllDataSet ? (
						<Button type="primary">Откликнуться</Button>
					) : (
						<Button type="primary">Дальше</Button>
					)
				]}
				onCancel={() => {
					setIsFormOpen(false)
				}}
			>
				<Form
					layout="vertical"
					initialValues={{
						gender: formData.gender,
						name: user?.firstname,
						surname: user?.lastname,
						patronymic: user?.middlename,
						birthDay: dayjs(user?.birthday.split('.').join('-'), 'DD.MM.YYYY'),
						country: formData.countryId,
						phoneNumber: user?.phone,
						email: user?.email
					}}
				>
					<Form.Item name={'gender'}>
						<Radio.Group
							value={gender}
							onChange={e => setGender(e.target.value)}
						>
							<Radio value={'M'}>Мужской</Radio>
							<Radio value={'W'}>Женский</Radio>
						</Radio.Group>
					</Form.Item>
					<Form.Item
						name={'name'}
						rules={[{ required: true, message: 'Поле имени не заполнено' }]}
					>
						<Input value={name} onChange={e => setName(e.target.value)}></Input>
					</Form.Item>
					<Form.Item
						name={'surname'}
						rules={[{ required: true, message: 'Поле фамилии не заполнено' }]}
					>
						<Input
							value={surname}
							onChange={e => setSurname(e.target.value)}
						></Input>
					</Form.Item>
					<Form.Item
						name={'patronymic'}
						rules={[{ required: true, message: 'Поле отчества не заполнено' }]}
					>
						<Input
							value={patronymic}
							onChange={e => setPatronymic(e.target.value)}
						></Input>
					</Form.Item>
					<Form.Item
						name={'birthDay'}
						rules={[{ required: true, message: 'Не введена дата рождения' }]}
					>
						<DatePicker
							format={'DD-MM-YYYY'}
							value={birthday}
							// onChange={(e, _) => {
							// 	setBirthday(e)
							// }}
						></DatePicker>
					</Form.Item>
					<Form.Item
						name={'country'}
						rules={[{ required: true, message: 'Не выбрана страна' }]}
					>
						<Select
							className="w-full rounded-lg"
							value={countryId}
							// onChange={e => dispatch(country(e))}
							options={
								countries === undefined
									? []
									: countries.map(el => ({
											value: el.id,
											label: el.shortName
									  }))
							}
						/>
					</Form.Item>
					<Form.Item
						name={'phoneNumber'}
						rules={[
							{ required: true, message: 'Поле номера телефона не заполнено' }
						]}
					>
						<Input
							value={phone}
							onChange={e => {
								setPhone(e.target.value)
							}}
						></Input>
					</Form.Item>
					<Form.Item
						name={'email'}
						rules={[
							{ required: true, message: 'Поле электронной почты не заполнено' }
						]}
					>
						<Input
							value={email}
							onChange={e => {
								setEmail(e.target.value)
							}}
						></Input>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
