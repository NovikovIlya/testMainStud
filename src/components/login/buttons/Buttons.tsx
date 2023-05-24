import { Button, Form } from 'antd'
import { Link } from 'react-router-dom'

import { GosSvg } from '../../../assets/svg'
import { useAppDispatch } from '../../../store'
import { DeleteLogInErrors } from '../../../store/creators/SomeCreators'

import styles from './Buttons.module.scss'

export const Buttons = () => {
	const dispatch = useAppDispatch()
	return (
		<Form.Item>
			<div className={styles.buttons}>
				<Button
					className={styles.login}
					size="large"
					type="primary"
					htmlType="submit"
				>
					Войти
				</Button>

				<Button
					className={styles.gos}
					onClick={e => {
						e.preventDefault()
					}}
					size="large"
					type="primary"
					ghost
					htmlType="submit"
				>
					Войти через
					<GosSvg />
				</Button>
				<div className={styles.reg}>
					<span>
						Нет профиля?{' '}
						<Link
							className={styles.link}
							to="/registration"
							onClick={() => dispatch(DeleteLogInErrors())}
						>
							Зарегистрируйтесь
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
