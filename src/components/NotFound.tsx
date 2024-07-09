import { Result } from 'antd'
import { useTranslation } from 'react-i18next'

import { BackMainPage } from './BackMainPage'

export const NotFound = () => {
	const { t } = useTranslation()
	return (
		<>
			<BackMainPage />
			<Result status="404" title={t('error 404')} subTitle={t('notFound')} />
		</>
	)
}
