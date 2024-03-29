import { AntDesignOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Rate, Select, Space, Typography } from 'antd'
import { blue307 } from '../../../utils/color'

export const AssessmentTeachers = () => {

	const testOptions = [
		{ value: 'jack', label: 'Jack' },
		{ value: 'lucy', label: 'Lucy' },
		{ value: 'Yiminghe', label: 'yiminghe' },
		{ value: 'disabled', label: 'Disabled', disabled: true }
	]

	return (
		<>
			<div className={`
			mb-14 text-[28px]`}>
				Оценка работы преподавателей
			</div>
			<Space direction="vertical" size={'small'}>
				<Typography.Text className={`
				text-[18px]/[18px]`}>
					Выбрать преподавателя
				</Typography.Text>
				<Select
					onChange={() => {}}
					placeholder={'Выбрать'}
					size="large"
					className={`
					w-[624px] 
					rounded-lg`}
					options={testOptions}
				/>
			</Space>
			<Card className={`
			w-full 
			mt-16 
			p-6`}>
				<div className={`
				flex 
				gap-14`}>
					<Avatar
						className={`
						w-full 
						min-w-[100px]`}
						size={100}
						icon={<AntDesignOutlined />}
					/>
					<div className={`
					flex 
					flex-col
					gap-[20px]
					`}>
						<p className={`
						text-black 
						text-lg 
						font-bold
						`}>
							Демина Галина Владимировна
						</p>
						<div className={`
						flex 
						flex-col 
						gap-[10px]
						`}>
							<p className={`
							text-black 
							text-base 
							font-bold`}>
								Должность:
							</p>
							<p className={`
							max-w-sm 
							min-w-[384px]`}>
								доцент, к.н. (доцент), КФУ / Институт фундаментальной медицины и
								биологии / Высшая школа биологии / Центр биологии и
								педагогического образования / кафедра ботаники и физиологии
								растений (биологические науки)
							</p>
						</div>
						<div className={`
							flex
							flex-col
							gap-[10px]
							`}>
							<p className={`
							text-black 
							text-base 
							font-bold
							`}>
								Преподаваемые дисциплины:
							</p>
							<p>Ботаника</p>
						</div>
					</div>

					<div className={`
					w-full`}>
						<p className={`
						text-black 
						text-base 
						font-bold`}>
							Рейтинг преподавателя
						</p>
						<div className={`
						w-full 
						flex 
						flex-col 
						gap-4 
						mt-5`}>
							<div className={`
							flex 
							justify-between`}>
								<p>Доброжелательность и тактичность</p>
								<div className={`
								flex 
								gap-10 
								items-center`}>
									<Rate className={`text-[${blue307}]`} />
									<p>4.4</p>
								</div>
							</div>
							<div className={`
							flex 
							justify-between`}>
								<p>Общая эрудиция</p>
								<div className={`
								flex 
								gap-10 
								items-center`}>
									<Rate className={`text-[${blue307}]`} />
									<p>4.4</p>
								</div>
							</div>
							<div className={`
							flex 
							justify-between`}>
								<p>Внешний вид и манера поведения</p>
								<div className={`
								flex 
								gap-10 
								items-center`}>
									<Rate className={`text-[${blue307}]`} />
									<p>4.4</p>
								</div>
							</div>
							<div className={`
							flex 
							justify-between`}>
								<p>Пунктуальность</p>
								<div className={`
								flex 
								gap-10 
								items-center`}>
									<Rate className={`text-[${blue307}]`} />
									<p>4.4</p>
								</div>
							</div>
						</div>
						<div className={`
						flex 
						justify-between 
						mt-10`}>
							<p>Всего: 114 голосов</p>
							<Button className={`
							!rounded-full`} type="primary" size="large">
								Сохранить
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</>
	)
}
