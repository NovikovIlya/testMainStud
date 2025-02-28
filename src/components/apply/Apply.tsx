import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined
} from '@ant-design/icons'
import { Button, Modal, Spin } from 'antd'
import clsx from 'clsx'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import img from '../../assets/images/avatar.png'
// import { getAdmission } from '../../store/creators/MainCreators'

import Styles from './Styles.module.scss'
import { useAppSelector } from '../../store'
import { useSubmitFormMutation } from '../../store/api/abiturent/abitRedirect'
import { getAdmission } from './MainCreators'
import { putRole } from '../../store/reducers/FormReducers/InfoUserReducer'
import { useTranslation } from 'react-i18next'


export const Apply = () => {
	const { t, i18n } = useTranslation()
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const role = useAppSelector(state=>state.InfoUser.role)
	const user = useAppSelector(state => state.auth.user)
	const [sendData,{isLoading}] = useSubmitFormMutation()
	const [url,setUrl] = useState('')
	const [requestStatus, changeStatus] = useState<'loading' | 'error' | 'success' | 'none'>('none')
	const [isModalOpen, setIsModalOpen] = useState(false);



	// @ts-ignore
	function setCookie (name, value, expires, path, domain, secure,samesite) {
		document.cookie = name + "=" + escape(value) +
		  ((expires) ? "; expires=" + expires : "") +
		  ((path) ? "; path=" + path : "") +
		  ((domain) ? "; domain=" + domain : "") + 
		  ((secure) ? "; secure" : "")+
		  ((samesite) ? "; samesite=" + samesite : "");
 	}
		  

	const request = async () => {
	
		// @ts-ignore
		if(user.roles[0].type ==='ABITUR'){
			const dataSend = {
				p_lan: '',
				p_video_p: '',
				p_mail:user?.email,
				p_pass: JSON.parse(localStorage.getItem('password') || '{}'),
				x: 5,
				y: 28
			}

			sendData(dataSend).unwrap().then(res=>{
					const sIdMatch = res.match(/setCookie\('s_id'\s*,\s*'([^']*)'/);
				
					const abitIdMatch = res.match(/setCookie\('abit_s_id'\s*,\s*'([^']*)'/);
			
					const dateRegex = /setCookie\('s_id'\s*,\s*'[^']*',\s*'([^']*)'/;
					const dateMatch = res.match(dateRegex);
			
					const urlRegex = /window\.location\.href="(abiturient_cabinet_new_start\?[^"]+)"/;
					const urlMatch = res.match(urlRegex);
				
					setUrl(urlMatch[1])

					setCookie('s_id'     , sIdMatch[1], dateMatch[1], '/','kpfu.ru','1','None');
					setCookie('abit_s_id', abitIdMatch[1], dateMatch[1], '/','kpfu.ru','1','None');
				
					showModal()
				
				})
			
		}else{

			changeStatus(() => 'loading')
			const response = await getAdmission(dispatch)
			if (response === 403) navigate('/')
			else {
				if (typeof response !== 'number') {
					window.open(response.link, '_blank')
					changeStatus(() => 'success')
				}
				if (response === 404) changeStatus(() => 'error')

				setTimeout(() => {
					changeStatus(() => 'none')
				}, 0)
			}
		}
	}

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	
		// Разбиваем URL на части по знаку ?
		const [, queryString] = url.split("?");

		// Разбиваем строку запроса на отдельные параметры
		const params = new URLSearchParams(queryString);

		// Извлекаем значения параметров p1 и p_hash
		const p1 = params.get("p1");
		const p_hash = params.get("p_hash");
		// window.location.href = `https://abiturient.kpfu.ru/entrant/${url}`
		window.location.href = `https://abiturient.kpfu.ru/entrant/abiturient_cabinet.entrant_info?p1=${p1}&p_hash=${p_hash}&p_lan=en`
	};

	const handleCancel = () => {
	setIsModalOpen(false);
	};
	return (
		<Spin spinning={isLoading}>
		<div
			className="rounded-[1vw] w-full px-[54px] py-[75px] flex h-full overflow-y-auto mt-12"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="text-4xl max-sm:text-3xl text-start text-white w-full font-extrabold flex flex-col justify-between">
				{t('ApplyText')}
				<Button
					onClick={() => request()}
					className={clsx(
						Styles.ApplyButtonCustom,
						requestStatus === 'error' && 'bg-red-500',
						requestStatus === 'success' && 'bg-green-500',
						requestStatus === 'none' && 'bg-none',
						'mt-10  '
					)}
				>
					{requestStatus === 'none' && <>	{t('Apply')}</>}
					{requestStatus === 'loading' && (
						<>
							<Spin
								indicator={<LoadingOutlined className="text-white mr-2" spin />}
							/>
							Loading...
						</>
					)}
					{requestStatus === 'error' && (
						<>
							<CloseOutlined className="text-white mr-2" />
							Error
						</>
					)}
					{requestStatus === 'success' && (
						<>
							<CheckOutlined className="text-white mr-2" />
							Redirection
						</>
					)}
				</Button>
			</div>
			<div className="max-xl:hidden">
				<img
					className="rounded-full absolute right-[200px] top-[-100px]"
					src={img}
					alt="avatar"
				/>
			</div>
			<Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  cancelButtonProps={{ style: { display: 'none' } }}>
			
				<p>{t('redirectText')}</p>
     		 </Modal>
		</div>
		</Spin>
	)
}
