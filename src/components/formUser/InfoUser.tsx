import { List, ListItem, ListItemPrefix, Radio, Typography } from '@material-tailwind/react';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import { useAppSelector } from '../../store';
import { role } from '../../store/reducers/FormReducers/InfoUserReducer';



import { ImagesLayout } from './ImagesLayout';


export const InfoUser = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const roleState = useAppSelector(state => state.InfoUser.role)
	const { t } = useTranslation()
	const handleOk = () => {
		if (roleState === '') {
			dispatch(role('guest'))
		}
		navigate('/form')
	}
	const handleSkip = () => {
		navigate('/user')
	}

	return (
		<ImagesLayout first>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center  px-5">
					<h2 className="text-center text-2xl font-bold border-solid border-0 border-b-2 border-[#3073D7] pb-2">
						{t('welcome')}
					</h2>

					<p className="mt-8 text-center text-sm font-bold px-7">{t('role')}</p>

					<List
						className="p-0 mt-5"
						onChange={e => {
							//@ts-ignore
							dispatch(role(e.target.id))
						}}
					>
						<ListItem className="p-0">
							<label
								htmlFor="guest"
								className="px-3 py-2 flex items-start mt-1 w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="guest"
										ripple={false}
										defaultChecked
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									<strong>{t('roleGuest')}</strong>
									{t('roleGuestDescription')}
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0 ">
							<label
								htmlFor="schoolboy"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="schoolboy"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									<strong>{t('roleSchoolboy')}</strong>
									{t('roleSchoolboyDescription')}
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="enrollee"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="enrollee"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									<strong>{t('roleEntrant')}</strong>
									{t('roleEntrantDescription')}
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="listener"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="listener"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									<strong>{t('roleListener')}</strong>
									{t('roleListenerDescription')}
								</Typography>
							</label>
						</ListItem>
						<ListItem className="p-0">
							<label
								htmlFor="applicant"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3">
									<Radio
										name="vertical-list"
										id="applicant"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm">
									<strong>{t('roleApplicant')}</strong>
									{t('roleApplicantDescription')}
								</Typography>
							</label>
						</ListItem>
					</List>

					<div className="border border-[#BDBDBD] border-solid rounded py-6 px-12 px- mt-10">
						<p className="text-center text-sm">{t('chooseRole')}</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px] ">
						<Button
							disabled
							type="default"
							className="w-[200px] h-[50px] rounded-full cursor-default font-bold border-[#3073D7] text-[#3073D7]"
						>
							{t('back')}
						</Button>
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full font-bold"
						>
							{t('next')}
						</Button>
					</div>
					<Button type="text" className="rounded-full w-[200px] h-[50px] mt-8" onClick={handleSkip}>
						{t('fillLater')}
					</Button>
				</div>
			</div>
		</ImagesLayout>
	)
}