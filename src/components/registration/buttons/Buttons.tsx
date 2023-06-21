import { Button, Checkbox, Form } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch } from '../../../store'
import { DeleteRegistrationErrors } from '../../../store/creators/SomeCreators'

import styles from './Buttons.module.scss'

interface IButtonsProps {
	check: boolean
	setCheck: (value: boolean) => void
	changeCheck: (checkButton: boolean) => void
}

export const Buttons: FC<IButtonsProps> = ({
	setCheck,
	changeCheck,
	check
}) => {
	const dispatch = useAppDispatch()
	const onChangeCheckbox = (e: CheckboxChangeEvent) =>
		setCheck(e.target.checked)
	return (
		<Form.Item className={styles.main}>
			<div className={styles.buttons}>
				<Button
					size="large"
					type="primary"
					htmlType="submit"
					disabled={!check}
					onClick={() => changeCheck(true)}
				>
					Далее
				</Button>
				<Checkbox
					className={styles.check}
					onChange={onChangeCheckbox}
					checked={check}
				>
					<p className={styles.termsUse}>
						Я принимаю пользовательское соглашение и даю разрешение порталу КФУ
						на обработку моих персональных данных в соотвествии с Федеральным
						законом №152-ФЗ от 27.07.2006 года “О персональных данных”
					</p>
				</Checkbox>
				<div className={styles.login}>
					<span>
						Уже есть профиль?{' '}
						<Link
							className={styles.link}
							to="/login"
							onClick={() => dispatch(DeleteRegistrationErrors())}
						>
							Войдите
						</Link>
					</span>
					<Link to={'https://kpfu.ru/'} className={styles.kpfu}>
						kpfu.ru
					</Link>
				</div>
			</div>
		</Form.Item>
	)
}
