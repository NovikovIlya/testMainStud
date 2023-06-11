import { Button, Form } from 'antd'

import styles from './Buttons.module.scss'

export const Buttons = () => {
	return (
		<div className={styles.main}>
			<span className={styles.textStyles}>
				Мы не передаем Ваши данные третьим лицам
			</span>
			<div className={styles.buttonBlock}>
				<Form.Item>
					<Button
						size="large"
						type="primary"
						className={`${styles.generalButton} ${styles.leftButton}`}
					>
						Пропустить
					</Button>
				</Form.Item>
				<Form.Item>
					<Button
						size="large"
						type="primary"
						htmlType="submit"
						className={`${styles.generalButton} ${styles.rightButton}`}
					>
						Войти
					</Button>
				</Form.Item>
			</div>
		</div>
	)
}
