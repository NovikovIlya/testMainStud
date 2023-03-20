import { getUnixTime } from './date'

export interface IAuthTokenInfo {
	exp: number
	lat: number
	login: string
}

const LIFE_TO_UPDATE_MULTIPLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
	if (!token) {
		return true
	}

	try {
		const tokenInfo = token.split('.')[1] //достаем среднюю часть токена: login, lat, exp
		const tokenInfoDecoded = window.atob(tokenInfo) //раскодирование данных
		const { exp, lat }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded) //извлечение в соответствующие переменные

		//тут уже смотрим истек ли access токен
		const tokenLeftTime = exp - getUnixTime() / 1000

		const minLifeTimeUpdate = (exp - lat) * LIFE_TO_UPDATE_MULTIPLIER

		//условие послволяет сделать обновление токена aceess не дожидаясь того, чтобы у него срок жизни закончился окончательно
		return tokenLeftTime < minLifeTimeUpdate
	} catch (e) {
		console.error(e)
		return true
	}
}
