import { Button, ConfigProvider, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SupportCenterSvg } from '../assets/svg/SupportCenterSvg'
import { useCheckIsEmployeeQuery } from '../store/api/practiceApi/contracts'

import DropDrag from './dnd/DropDrag'
import { FeedbackWindow } from './feedbackWindow/FeedbackWindow'
import { Layout } from './layout/Layout'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../store'

export const User = () => {
	const { t,i18n } = useTranslation()
	const [open, setOpen] = useState(false)
	const { data, isSuccess } = useCheckIsEmployeeQuery()
	const [searchParams] = useSearchParams();
    const hasEnParam = searchParams.has('en');
	const acceesss = useAppSelector((state)=>state.auth.accessToken)
	console.log('acceesssacceesssacceesss',acceesss)
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
					<div className={`mt-[125px] text-2xl font-bold text-blue1f5`}>
						{t('PersonalAccount')}
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
