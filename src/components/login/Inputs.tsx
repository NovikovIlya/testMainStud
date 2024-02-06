import { Form, Input } from 'antd'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { IError } from '../../api/types'

interface IInputsProps {
	error?: IError
}
export const Inputs: FC<IInputsProps> = ({ error }) => {
	const { t } = useTranslation()
	return (
		<>
			<Form.Item
				name="email"
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={error !== null && <div>{error?.error}</div>}
			>
				<Input
					className="rounded-lg mt-5 h-12 px-5 py-3"
					maxLength={100}
					type="text"
					required
					size="large"
					placeholder="Email/Login"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				style={{ marginBottom: 30 }}
				validateStatus={error !== null ? 'error' : undefined}
				help={error !== null && <div>{error?.error}</div>}
			>
				<Input.Password
					className="rounded-lg h-12 px-5 py-3"
					size="large"
					required
					maxLength={100}
					type="password"
					placeholder={t('password')}
				/>
			</Form.Item>
			<p className="mt-5 w-fit cursor-pointer underline;">
				{t('rememberPassword')}
			</p>
		</>
	)
}
