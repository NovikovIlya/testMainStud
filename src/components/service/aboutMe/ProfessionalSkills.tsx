import { Input, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { Skills } from './Skills'

export const ProfessionalSkills = () => {
	const { t } = useTranslation()

	return (
		<div className="m-14 radio w-full max-w-2xl">
			<Space.Compact block direction="vertical" className="gap-5">
				<Typography.Title level={3}>{t('ProfessionalSkills')}</Typography.Title>
				<Space direction="vertical" size={'small'} className="w-full mb-5">
					<Typography.Text>
						Какими ключевыми навыками вы обладаете?
					</Typography.Text>
					<Skills />
				</Space>
				<Space direction="vertical" size={'small'} className="w-full">
					<Typography.Text>О себе (не обязательно)</Typography.Text>
					<Input.TextArea
						rows={4}
						size="large"
						placeholder=""
						className="w-full"
					/>
				</Space>
			</Space.Compact>
		</div>
	)
}
