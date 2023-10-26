import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { RootState, useAppSelector } from '../../../store'
import { getAbUsForm } from '../../../store/creators/MainCreators'
import { allData } from '../../../store/reducers/FormReducers/FormReducer'
import { ImagesLayout } from '../ImagesLayout'

import { Buttons } from './Buttons/Buttons'
import { Inputs } from './Inputs/Inputs'
import { Switcher } from './Radio/Switcher'

export const FormModal = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [IsEmpty, changeIsEmpty] = useState<boolean>(false)
	const userRole = useAppSelector((state: RootState) => state.InfoUser.role)

	const { t, i18n } = useTranslation()

	const IsNotGuest = async () => {
		const response = await getAbUsForm()
		if (response && userRole !== 'GUEST') {
			navigate('/user')
		} else {
			response && dispatch(allData(response))
		}
	}

	useEffect(() => {
		IsNotGuest()
	}, [])

	useEffect(() => {
		changeIsEmpty(false)
	}, [i18n.language])
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
					<Inputs IsEmpty={IsEmpty} />
					<Buttons changeIsEmpty={changeIsEmpty} />
				</div>
			</div>
		</ImagesLayout>
	)
}
