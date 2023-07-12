import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ImagesLayout } from '../ImagesLayout'

import { Buttons } from './Buttons/Buttons'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

export const FormModal = () => {
	const [error, setError] = useState(false)

	const { t } = useTranslation()

	return (
		<ImagesLayout>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center  px-5">
					<h2 className="text-center font-bold text-2xl">{t('fillForm')}</h2>
					<p className="mt-5 text-center text-sm font-bold px-7">
						{t('fillFormDescription')}
					</p>
					<h3 className="self-start my-7 text-xl">{t('aboutMe')}</h3>
					<Switcher />
					<Inputs error={error} />
					<Buttons setError={setError} />
				</div>
			</div>
		</ImagesLayout>
	)
}
