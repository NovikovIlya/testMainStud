import { Dispatch } from '@reduxjs/toolkit'
import request from 'axios'
import { Cookies } from 'react-cookie'

import {

	getAdmissionLink,
	
} from './index'


const cookies = new Cookies()




export const getAdmission = async (dispatch: Dispatch): Promise<{link: string} | 404 | 403> => {
	try {
		const response = await getAdmissionLink();
	
		cookies.remove('s_id', { domain: 'kpfu.ru', path: '/' });
		cookies.remove('s_abit_id', { domain: 'kpfu.ru', path: '/' });
		cookies.set('s_id', response.session, { domain: 'kpfu.ru', path: '/' });
		cookies.set('s_abit_id', response.session, { domain: 'kpfu.ru', path: '/' });
		
		return response;
	} catch (e) {
		// @ts-ignore
		if (e.response && e.response.status === 403) {
			const refreshResponse = await refreshToken();
			if (refreshResponse.status === 200) {
				// Повторная попытка получения admission link после обновления токена
				return getAdmission(dispatch);
			} else {
				return 403; 
			}
		}
		return 404; 
	}
}

// Функция для обновления токена
const refreshToken = async (): Promise<Response> => {
	const response = await fetch('https://newlk.kpfu.ru/user-api/token/refresh', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({
		refreshToken: localStorage.getItem('refresh')?.replaceAll('"', '')
	  }),
	});
	return response;
}

