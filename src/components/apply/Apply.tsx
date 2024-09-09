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


export const Apply = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const role = useAppSelector(state=>state.InfoUser.role)
	const user = useAppSelector(state => state.auth.user)
	const [sendData,{}] = useSubmitFormMutation()
	const [url,setUrl] = useState('')
	console.log('user?.roles.type',user?.roles[0].type)
	const [requestStatus, changeStatus] = useState<
		'loading' | 'error' | 'success' | 'none'
	>('none')
	const [isModalOpen, setIsModalOpen] = useState(false);
	const userJson = localStorage.getItem('userInfo')
	const pass =   localStorage.getItem('password')
	const userData = userJson ?  JSON.parse(userJson) : []
	const passData = pass ? JSON.parse(pass) : []

	// @ts-ignore
	function setCookie (name, value, expires, path, domain, secure,samesite) {
		document.cookie = name + "=" + escape(value) +
		  ((expires) ? "; expires=" + expires : "") +
		  ((path) ? "; path=" + path : "") +
		  ((domain) ? "; domain=" + domain : "") + 
		  ((secure) ? "; secure" : "")+
		  ((samesite) ? "; samesite=" + samesite : "");
 	 }
		  
	// function getCookie(name:any) {
	// 	var cookie = " " + document.cookie;
	// 	var search = " " + name + "=";
	// 	var setStr = null;
	// 	var offset = 0;
	// 	var end = 0;
	// 	if (cookie.length > 0) {
	// 		offset = cookie.indexOf(search);
	// 		if (offset != -1) {
	// 			offset += search.length;
	// 			end = cookie.indexOf(";", offset)
	// 			if (end == -1) {
	// 				end = cookie.length;
	// 			}
	// 			setStr = unescape(cookie.substring(offset, end));
	// 		}
	// 	}
	// 	return(setStr);
	// }



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
			
		}
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
		<div
			className="rounded-[1vw] w-full px-[54px] py-[75px] flex h-full overflow-y-auto"
			style={{
				background: 'linear-gradient(89.94deg, #71AAFF 12.16%, #3D7AD5 104.42%)'
			}}
		>
			<div className="text-4xl max-sm:text-3xl text-start text-white w-full font-extrabold flex flex-col justify-between">
				Admission to university
				<Button
					onClick={() => request()}
					className={clsx(
						Styles.ApplyButtonCustom,
						requestStatus === 'error' && 'bg-red-500',
						requestStatus === 'success' && 'bg-green-500',
						requestStatus === 'none' && 'bg-none',
						'mt-10'
					)}
				>
					{requestStatus === 'none' && <>Apply</>}
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
					className="rounded-full absolute right-[200px] top-[80px]"
					src={img}
					alt="avatar"
				/>
			</div>
			<Modal title="Redirect" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
				<p>Are you sure you want to proceed?</p>
     		 </Modal>
		</div>
	)
}
