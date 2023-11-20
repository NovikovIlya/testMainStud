import { ListItemPrefix, Radio, Typography } from '@material-tailwind/react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../../../../store'
import { gender } from '../../../../store/reducers/FormReducers/FormReducer'

export const Switcher = () => {
	const dispatch = useDispatch()
	const genderState = useAppSelector(state => state.Form.gender)
	const { t } = useTranslation()
	return (
		<div className="flex self-start mb-4">
			<label htmlFor="0" className="flex items-start  w-full cursor-pointer">
				<ListItemPrefix className="mr-3">
					<Radio
						crossOrigin="true"
						name="vertical-list"
						id="0"
						ripple={false}
						className="hover:before:opacity-0 mt-1"
						containerProps={{
							className: 'p-0'
						}}
						onChange={() => dispatch(gender('W'))}
						checked={genderState === 'W' ? true : false}
					/>
				</ListItemPrefix>
				<Typography color="blue-gray" className="font-medium text-sm">
					{t('woman')}
				</Typography>
			</label>
			<label
				htmlFor="1"
				className="pl-3 flex items-start  w-full cursor-pointer"
			>
				<ListItemPrefix className="mr-3">
					<Radio
						crossOrigin="true"
						name="vertical-list"
						id="1"
						ripple={false}
						className="hover:before:opacity-0 mt-1"
						containerProps={{
							className: 'p-0'
						}}
						onChange={() => dispatch(gender('M'))}
						checked={genderState === 'M' ? true : false}
					/>
				</ListItemPrefix>
				<Typography color="blue-gray" className="font-medium text-sm">
					{t('man')}
				</Typography>
			</label>
		</div>
	)
}
