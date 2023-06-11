import { DatePickerProps, Form } from 'antd'
import type { Dayjs } from 'dayjs'
import { useState } from 'react'

import { Buttons } from './Buttons/Buttons'
import styles from './Form.module.scss'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

interface IForm {
	radio: string
	surName: string
	name: string
	patronymic: string
	country: string
}

export const FormModal = () => {
	const [Value, SetValue] = useState<any>()

	const onFinish = (values: IForm) => {
		console.log(Value)
		console.log(values)
	}
	return (
		<div className={styles.main}>
			<div className={styles.wrapper}>
				<div className={styles.topBlock}>
					<span className={`text-lg justify-center ${styles.textStyles}`}>
						Заполните короткую форму
					</span>
					<span className={`text-xs justify-center ${styles.textStyles}`}>
						Это необходимо для полного доступа на платформе, который включает в
						себя возможность записи на курсы, мероприятия и многое другое
					</span>
					<span className={`text-lg ${styles.textStyles}`}>Обо мне</span>
				</div>
				<Form
					name="login"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					className={styles.InputsBlock}
				>
					<Switcher />
					<Inputs setValue={SetValue} />
					<Buttons />
				</Form>
				<div className={styles.BottomBlock}>
					<span className={`${styles.circle} ${styles.active}`}></span>
					<span className={styles.circle}></span>
					<span className={styles.circle}></span>
					<span className={styles.circle}></span>
					<span className={styles.circle}></span>
				</div>
			</div>
		</div>
	)
}
