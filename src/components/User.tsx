import { Button, ConfigProvider, Popover, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SupportCenterSvg } from '../assets/svg/SupportCenterSvg'
import { useCheckIsEmployeeQuery } from '../store/api/practiceApi/contracts'

import DropDrag from './dnd/DropDrag'
import { FeedbackWindow } from './feedbackWindow/FeedbackWindow'
import { Layout } from './layout/Layout'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store'
import PersonalizationSvg from '../assets/svg/PersonalizationSvg'
import { setEdit } from '../store/reducers/authSlice'

export const User = () => {
	const { t,i18n } = useTranslation()
	const [open, setOpen] = useState(false)
	const { data, isSuccess } = useCheckIsEmployeeQuery()
	const [searchParams] = useSearchParams();
    const hasEnParam = searchParams.has('en');
	const acceesss = useAppSelector((state)=>state.auth.accessToken)
	const role = useAppSelector((state)=>state.auth.user?.roles)
	const dispatch = useAppDispatch()
	console.log('role',role)
	const hide = () => {
		setOpen(false)
	}
	const handleOpenChange = (newOpen: boolean) => {
		setOpen(newOpen)
	}

	useEffect(() => {
		if (isSuccess) {
			localStorage.setItem('practice', 'practice')
		}
	}, [data])

	useEffect(()=>{
		if(hasEnParam){
			i18n.changeLanguage('en')
		}
	},[])

	return (
		<Layout>
			<div className="px-10 flex items-center justify-center">
				<div className="max-w-[1600px] w-[1600px]">
					<div className={`mt-[125px] text-2xl font-bold text-blue1f5 justify-between flex`}>
						{t('PersonalAccount')}
						{role && role[0]?.type!=='ABITUR' || role && role[0]?.type!=='OTHER' ?
						<div className='flex gap-3 items-center'>
							<span className='text-sm font-normal'>{t('Personalization')}</span>
							<Switch   defaultValue={false} onClick={()=>dispatch(setEdit())} />
						</div>
						:''}		
					</div>
					<DropDrag />
				</div>

				<ConfigProvider
					theme={{
						token: {
							borderRadiusLG: 20
						}
					}}
				>
					<Popover
						trigger="click"
						content={<FeedbackWindow closeWindow={hide} />}
						placement={'topLeft'}
						arrow={false}
						open={open}
						onOpenChange={handleOpenChange}
					>
						<Button
							type={'primary'}
							className={`
                        flex items-center justify-center 
                        fixed rounded-full w-[62px] h-[62px] 
                        right-[3%] bottom-[25px]
                        shadow-2xl`}
						>
							<SupportCenterSvg />
						</Button>
					</Popover>
				</ConfigProvider>
			</div>
		</Layout>
	)
}
