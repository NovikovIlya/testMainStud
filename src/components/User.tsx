import { useTranslation } from 'react-i18next'

import DropDrag from './dnd/DropDrag'
import { Layout } from './layout/Layout'

export const User = () => {
	const { t } = useTranslation()
	return (
		<Layout>
			<div className="px-10 flex items-center justify-center">
				<div className="max-w-[1600px] w-[1600px]">
					<div className={`mt-[125px] text-2xl font-bold text-blue1f5`}>
						{t('PersonalAccount')}
					</div>
					<DropDrag />
				</div>
			</div>
		</Layout>
	)
}
