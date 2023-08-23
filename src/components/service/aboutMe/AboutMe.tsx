import { DatePicker, Input, Radio, Select, Space, Typography } from 'antd'

import { useAppSelector } from '../../../store'

export const AboutMe = () => {
	const user = useAppSelector(state => state.Profile.profileData.CurrentData)
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
						placeholder={user?.lastname}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Имя</Typography.Text>
					<Input
						placeholder={user?.firstname}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Отчество</Typography.Text>
					<Input
						placeholder={user?.middlename}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Дата рождения</Typography.Text>
					<DatePicker
						placeholder={user?.birthday}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Страна гражданства</Typography.Text>
					<Select
						placeholder={user?.citizenship}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Телефон</Typography.Text>
					<Input
						placeholder={user?.phone}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
				<Space direction="vertical" size={'small'}>
					<Typography.Text>Электронная почта</Typography.Text>
					<Input
						placeholder={user?.email}
						size="large"
						className="w-[624px] shadow "
					/>
				</Space>
			</Space>
		</div>
	)
}
