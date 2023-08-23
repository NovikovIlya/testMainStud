import { DatePicker, Input, Radio, Select, Space, Typography } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { formItem } from '../../../api/types'
import { useAppSelector } from '../../../store'
import { getAbUsForm } from '../../../store/creators/MainCreators'
import { useGetCountriesQuery } from '../../../store/slice/countrySlice'

export const AboutMe = () => {
	const { t, i18n } = useTranslation()
	const { data: countries } = useGetCountriesQuery(i18n.language)
	const dispatch = useDispatch()
	let [fieldData, setFieldData] = useState<formItem | null>(null)

	const getData = async () => {
		const response = await getAbUsForm(dispatch)
		if (response !== null) {
			setFieldData(response)
		}
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Typography.Title level={3}>Обо мне</Typography.Title>
				<Space direction="vertical" size={'small'}>
					<Typography.Text className=" mt-10 opacity-80 text-black text-sm font-normal">
						Пол
					</Typography.Text>
					<Radio.Group defaultValue={1}>
						<Radio value={1}>Мужской</Radio>
						<Radio value={2}>Женский</Radio>
					</Radio.Group>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Фамилия</Typography.Text>
					<Input
						placeholder="Фамилия"
						size="large"
						className="w-[624px] shadow "
						defaultValue={fieldData?.surName}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Имя</Typography.Text>
					<Input
						placeholder="Имя"
						size="large"
						className="w-[624px] shadow "
						defaultValue={fieldData?.name}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Отчество</Typography.Text>
					<Input
						placeholder="Отчество"
						size="large"
						className="w-[624px] shadow "
						defaultValue={fieldData?.patronymic}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Дата рождения</Typography.Text>
					<DatePicker
						placeholder="Дата рождения"
						size="large"
						className="w-[624px] shadow "
						value={
							fieldData === null
								? null
								: dayjs(
										'DD.MM.YYYY',
										fieldData?.birthDay.split('-').reverse().join('.')
								  )
						}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Страна гражданства</Typography.Text>
					<Select
						placeholder="Страна гражданства"
						size="large"
						className="w-[624px] shadow "
						options={
							countries == null
								? []
								: countries.map(el => ({ value: el.id, label: el.shortName }))
						}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Телефон</Typography.Text>
					<Input
						placeholder="Телефон"
						size="large"
						className="w-[624px] shadow "
						defaultValue={fieldData?.phone}
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Электронная почта</Typography.Text>
					<Input
						placeholder="Электронная почта"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
			</Space>
		</div>
	)
}
