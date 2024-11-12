import { Button, Card, ConfigProvider, Descriptions, Popover, Switch } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { SupportCenterSvg } from '../assets/svg/SupportCenterSvg'
import { useCheckIsEmployeeQuery } from '../store/api/practiceApi/contracts'

import DropDrag from './dnd/DropDrag'
import { FeedbackWindow } from './feedbackWindow/FeedbackWindow'
import { Layout } from './layout/Layout'

import { useAppDispatch, useAppSelector } from '../store'
import { setEdit } from '../store/reducers/authSlice'
import InfoAbitAccepted from './InfoAbitAccepted'
import { useLocalStorageState } from 'ahooks'

export const User = () => {
	const { t,i18n } = useTranslation()
	const [open, setOpen] = useState(false)
	const { data, isSuccess } = useCheckIsEmployeeQuery()
	const user = useAppSelector(state => state.auth.user)
	const dispatch = useAppDispatch()
	const [acceptedData,setAcceptedData] = useLocalStorageState<any>('acceptedData',{defaultValue:null})
	
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

	
	// Проверка на роль Абитурента + зачислен ли и сбор данных по зачислению 
	useEffect(()=>{
		if(user?.roles?.some(item => item.credentials && item.credentials.length > 0)){
			setAcceptedData(user?.roles?.map((item)=>{
				return item.credentials
			}))
		}
	},[user?.roles])

	return (
		<Layout>
			<div className="px-10 flex items-center justify-center"> 
				<div className="max-w-[1600px] w-[1600px]">
					<div className={`mt-[125px] text-2xl font-bold text-blue1f5 justify-between flex`}>
						{t('PersonalAccount')}
						 {user?.roles[0].type==='ABITUR' || user?.roles[0].type==='OTHER' ? '':
						<div className='flex gap-3 items-center'>
							{/* <span className='text-sm font-normal'>{t('Personalization')}</span>
							<Switch   defaultValue={false} onClick={()=>dispatch(setEdit())} /> */}
						</div>
						}		
					</div>
					{acceptedData ? acceptedData[0]?.map((item:any)=><InfoAbitAccepted login={item.login} password={item.password} key={item.login}/>):''}
			
					<DropDrag />
				</div>

				<ConfigProvider
					theme={{
						token: {
							borderRadiusLG: 20
						}
					}}
				>
					{/* <Popover
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
					</Popover> */}
				</ConfigProvider>
			</div>
		</Layout>
	)
}
