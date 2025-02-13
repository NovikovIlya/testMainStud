import {
	List,
	ListItem,
	ListItemPrefix,
	Radio,
	Typography
} from '@material-tailwind/react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { useSetRoleMutation } from '../../store/api/serviceApi'
import { setRole,setSubRole } from '../../store/reducers/authSlice'
import { blue307 } from '../../utils/color'

import { ImagesLayout } from './ImagesLayout'
import { useLocalStorageState } from 'ahooks'

export const InfoUserUpdate = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [postRole] = useSetRoleMutation()
	const role = useAppSelector(state => state.auth.user?.roles[0].type)
	const subRole = useAppSelector(state => state.auth.subRole)
	const [subRoleLocal, setSubrole] = useLocalStorageState<any>(
		'subRole',
		{
		  defaultValue: '',
		},
	);

	const { t } = useTranslation()
	const handleOk = async () => {
		role && postRole({ role: subRole })
		navigate('/user')
	}
	const handleSkip = () => {
		navigate('/user')
	}

	return (
		<ImagesLayout first>
			<div className="w-full flex justify-center ">
				<div className="container max-w-2xl flex flex-col items-center justify-center  px-5">
					

					<p className="mt-8 text-center text-sm font-bold px-7">{t('role')}</p>

					<List
						className="p-0 mt-5"
						onChange={e => {
							//@ts-ignore
							// dispatch(setRole(e.target.id))
							dispatch(setSubRole(e.target.id))
							//@ts-ignore
							setSubrole(e.target.id)
						} } placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}					>
						<ListItem className="p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<label
								htmlFor="GUEST"
								className="px-3 py-2 flex items-start mt-1 w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<Radio
										crossOrigin="true"
										name="vertical-list"
										id="GUEST"
										ripple={false}
										defaultChecked={role === 'GUEST' ? true : false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<strong>{t('roleGuest')}</strong>
									{t('roleGuestDescription')}
								</Typography>
							</label>
						</ListItem>
						{/* <ListItem className="p-0 "  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<label
								htmlFor="SCHOOL"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<Radio
										crossOrigin="true"
										name="vertical-list"
										id="SCHOOL"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										defaultChecked={role === 'SCHOOL' ? true : false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<strong>{t('roleSchoolboy')}</strong>
									{t('roleSchoolboyDescription')}
								</Typography>
							</label>
						</ListItem> */}
						<ListItem className="p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<label
								htmlFor="ABIT"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<Radio
										crossOrigin="true"
										name="vertical-list"
										id="ABIT"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										defaultChecked={role === 'ABIT' ? true : false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<strong>{t('roleEntrant')}</strong>
									{t('roleEntrantDescription')}
								</Typography>
							</label>
						</ListItem>
						{/* <ListItem className="p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<label
								htmlFor="ATTEND"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<Radio
										name="vertical-list"
										id="ATTEND"
										ripple={false}
										crossOrigin="true"
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										defaultChecked={role === 'ATTEND' ? true : false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<strong>{t('roleListener')}</strong>
									{t('roleListenerDescription')}
								</Typography>
							</label>
						</ListItem> */}
						{/* <ListItem className="p-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
							<label
								htmlFor="SEEKER"
								className="px-3 py-2 flex items-start  w-full cursor-pointer"
							>
								<ListItemPrefix className="mr-3"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<Radio
										name="vertical-list"
										id="SEEKER"
										crossOrigin="true"
										ripple={false}
										className="hover:before:opacity-0 mt-1"
										containerProps={{
											className: 'p-0'
										}}
										defaultChecked={role === 'SEEKER' ? true : false} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}									/>
								</ListItemPrefix>
								<Typography color="blue-gray" className="font-medium text-sm"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
									<strong>{t('roleApplicant')}</strong>
									{t('roleApplicantDescription')}
								</Typography>
							</label>
						</ListItem> */}
					</List>

					<div className="border border-[#BDBDBD] border-solid rounded py-6 px-12 px- mt-10">
						<p className="text-center text-sm">{t('chageRoleGuest')}</p>
					</div>
					<div className="w-full flex justify-center items-center gap-8 mt-[60px] ">
						
						<Button
							onClick={handleOk}
							type="primary"
							className="w-[200px] h-[50px] rounded-full font-bold"
						>
							Ок
						</Button>
					</div>
					{/* <Button
						type="text"
						className="rounded-full w-[200px] h-[50px] mt-8"
						onClick={handleSkip}
					>
						{t('fillLater')}
					</Button> */}
				</div>
			</div>
		</ImagesLayout>
	)
}
