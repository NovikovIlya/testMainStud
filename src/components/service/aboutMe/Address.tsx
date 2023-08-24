import { Input, Radio, Space, Typography } from 'antd'
import type { RadioChangeEvent } from 'antd'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { IAdress } from '../../../api/types'
import { getAbUsAddress } from '../../../store/creators/MainCreators'

export const Address = () => {
	const [value, setValue] = useState(0)
	const [fieldData, setFieldData] = useState<IAdress | null>(null)
	const dispatch = useDispatch()

	const onChange = (e: RadioChangeEvent) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}

	const getData = async () => {
		const response = await getAbUsAddress(dispatch)
		setFieldData(response)
	}

	useEffect(() => {
		getData()
	}, [])

	return (
		<div className="m-14 radio">
			<Space direction="vertical" size={20}>
				<Space direction="vertical" size={'small'}>
					<Typography.Title
						level={3}
						className="text-black text-2xl font-bold leading-normal"
					>
						Адрес
					</Typography.Title>
					<Typography.Text ellipsis>
						Заполнение полей должно выполняться согласно данным в паспорте
					</Typography.Text>
				</Space>

				<Typography.Text
					className="text-black text-sm font-bold leading-[18px]"
					ellipsis
				>
					Место постоянного жительства
				</Typography.Text>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Страна</Typography.Text>
					<Input
						placeholder="Россия"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Город</Typography.Text>
					<Input
						placeholder="Казань"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Улица</Typography.Text>
					<Input
						placeholder="Арбузова"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Дом</Typography.Text>
					<Input placeholder="39" size="large" className="w-[624px] shadow " />
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Квартира</Typography.Text>
					<Input placeholder="88" size="large" className="w-[624px] shadow " />
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text>Индекс</Typography.Text>
					<Input
						placeholder="456 836"
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>

				<Space direction="vertical" size={'small'}>
					<Typography.Text ellipsis>
						Совпадает ли адрес регистрации с адресом фактического проживания?
					</Typography.Text>
					<Radio.Group defaultValue={0} onChange={onChange} value={value}>
						<Radio value={0}>Да</Radio>
						<Radio value={1}>Нет</Radio>
					</Radio.Group>
				</Space>
				<div className={clsx(!value && 'hidden')}>
					<Space direction="vertical" size={20}>
						<Typography.Text
							className="text-black text-sm font-bold leading-[18px]"
							ellipsis
						>
							Адрес фактического пребывания
						</Typography.Text>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Страна</Typography.Text>
							<Input
								placeholder="Россия"
								size="large"
								className="w-[624px] shadow"
							/>
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>Город</Typography.Text>
							<Input
								placeholder="Казань"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Улица</Typography.Text>
							<Input
								placeholder="Арбузова"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>
						<Space direction="vertical" size={'small'}>
							<Typography.Text>Дом</Typography.Text>
							<Input
								placeholder="39"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>Квартира</Typography.Text>
							<Input
								placeholder="88"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>

						<Space direction="vertical" size={'small'}>
							<Typography.Text>Индекс</Typography.Text>
							<Input
								placeholder="456 836"
								size="large"
								className="w-[624px] shadow "
							/>
						</Space>
					</Space>
				</div>
			</Space>
		</div>
	)
}
