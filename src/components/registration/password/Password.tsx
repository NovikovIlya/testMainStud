import { Form, Input } from 'antd'
import { AllHTMLAttributes, FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../../api/types'

import styles from './Password.module.scss'

interface IPasswordProps {
	error: IError[] | null
	confirmPassword: boolean
	ErrorPrinter: (
		searchWord: string,
		error: IError[] | null
	) => AllHTMLAttributes<HTMLDivElement>
}

export const Password: FC<IPasswordProps> = ({
	error,
	confirmPassword,
	ErrorPrinter
}) => {
	const { t } = useTranslation()
	return (
		<>
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				className={styles.input}
				rules={[{ required: true, message: '' }]}
				validateStatus={
					error?.some(
						el =>
							el.message.indexOf('пароль') >= 0 ||
							el.message.indexOf('пароля') >= 0
					) || confirmPassword === false
						? 'error'
						: undefined
				}
				help={
					<>
						{ErrorPrinter('пароль', error)}
						{ErrorPrinter('пароля', error)}
					</>
				}
			>
				<Input.Password
					className={styles.password}
					size="large"
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<Form.Item
				name="confirmPassword"
				className={styles.input}
				style={{ marginBottom: 30 }}
				rules={[
					{
						required: true,
						message: t('errorPassword')
					}
				]}
				validateStatus={confirmPassword === false ? 'error' : undefined}
				help={<>{!confirmPassword && <>{t('confirm')}</>}</>}
			>
				<Input size="large" type="password" placeholder={t('repeatPassword')} />
			</Form.Item>
		</>
	)
}
