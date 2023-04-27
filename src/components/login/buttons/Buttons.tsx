import { Button, Form } from 'antd'
import { Link } from 'react-router-dom'

import { GosSvg } from '../../../assets/svg'

import styles from './Buttons.module.scss'

export const Buttons = () => {
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
						<Link className={styles.link} to="/registration">
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
