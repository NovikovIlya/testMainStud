import { Button, Input } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../../store'
import {
	description,
	idAdd,
	idDelete,
	link,
	place,
	time
} from '../../../store/reducers/FormReducers/WorkReducer'
import { ImagesLayout } from '../ImagesLayout'

const { TextArea } = Input

export const WorkForm = () => {
	const data = useAppSelector(state => state.Work)
	const { t } = useTranslation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [error, setError] = useState(false)
	const handleCancel = () => {
		navigate('/documents')
	}
	const handleOk = () => {
		if (!saveInStore()) {
			navigate('/user')
		} else setError(true)
	}
	const handleSkip = () => {
		navigate('/user')
	}
	const saveInStore = () => {
		let IsEmpty = data.workItems.some(
			item => item.place === '' || item.time === ''
		)
		if (data.description === '' || data.link === '') IsEmpty = true
		return IsEmpty
	}
	const handleDeleteEducation = (id: number) => {
		dispatch(idDelete(id))
	}
	const addWork = () => {
		dispatch(idAdd(data.workItems[data.workItems.length - 1].id + 1))
	}
	return (
		<ImagesLayout>
			<div className="w-full flex justify-center  text-sm">
				<div className="container max-w-2xl flex flex-col  pч-5">
					<h3 className="text-xl">{t('work')}</h3>
					<div className="flex flex-col gap-10 w-full">
						{data.workItems.map(item => (
							<div key={item.id}>
								<div className=" mt-5 w-full max-sm:gap-4">
									<span className="flex">
										<p className="flex mr-5">{t('placeWork')}</p>
										{item.id !== 0 && (
											<p
												onClick={() => handleDeleteEducation(item.id)}
												className="opacity-40 text-sm cursor-pointer"
											>
												{t('remove')}
											</p>
										)}
									</span>

									<Input
										placeholder={t('placeholder')}
										size="large"
										className={clsx(
											'mt-2',
											error &&
												!data.workItems[item.id].place &&
												'border-rose-500'
										)}
										onChange={e =>
											dispatch(place({ id: item.id, place: e.target.value }))
										}
										value={data.workItems[item.id].place}
									/>
								</div>
								<p className="mt-4 self-start">{t('periodOperation')}</p>
								<Input
									placeholder={t('timeLine')}
									size="large"
									className={clsx(
										'mt-2',
										error && !data.workItems[item.id].time && 'border-rose-500'
									)}
									onChange={e =>
										dispatch(time({ id: item.id, time: e.target.value }))
									}
									value={data.workItems[item.id].time}
								/>
							</div>
						))}
					</div>

					<div className="mt-10 flex flex-col items-center">
						<Button
							className="rounded-full text-center p-0 w-8 h-8 text-xl"
							type="primary"
							onClick={addWork}
						>
							+
						</Button>
						<p className="opacity-40 text-sm mt-2">{t('add')}</p>
						<p className="opacity-40 text-sm lowercase">{t('work')}</p>
					</div>
					<div>
						<p className="text-black text-sm font-normal">
							{t('workExperience')}
						</p>
						<TextArea
							placeholder={t('tellYourWorkExperience')}
							className={clsx(
								'mt-2',
								error && !data.description && 'border-rose-500'
							)}
							autoSize={{ minRows: 4, maxRows: 8 }}
							onChange={e => dispatch(description(e.target.value))}
							value={data.description}
						/>
						<p className="text-black text-sm font-normal mt-4">
							{t('linkPortfolio')}
						</p>
						<Input
							placeholder={t('timeLine')}
							size="large"
							className={clsx('mt-2', error && !data.link && 'border-rose-500')}
							onChange={e => dispatch(link(e.target.value))}
							value={data.link}
						/>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px]">
						<Button
							onClick={handleCancel}
							type="default"
							className="w-[200px] h-[50px] font-bold rounded-full border-[#3073D7] text-[#3073D7]"
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] font-bold h-[50px] rounded-full"
						>
							{t('next')}
						</Button>
					</div>
					<div className="w-full flex justify-center">
						<Button
							onClick={handleSkip}
							type="text"
							className="rounded-full w-[200px]  h-[50px] mt-8"
						>
							{t('fillLater')}
						</Button>
					</div>
				</div>
			</div>
		</ImagesLayout>
	)
}
