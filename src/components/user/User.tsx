import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import DropDrag from '../dnd/DropDrag'
import { Faq } from '../faq/Faq'
import { Layout } from '../layout/Layout'

export const User = () => {
	const { t } = useTranslation()
	return (
		<Layout>
			<div className="px-10 flex items-center justify-center">
				<div className="max-w-[1600px] w-[1600px]">
					<div className={clsx(`mt-[125px] text-2xl font-bold text-[#1F5CB8]`)}>
						{t('PersonalAccount')} <br />
					</div>
					<DropDrag />
					<Faq />
				</div>
			</div>
		</Layout>
	)
}
