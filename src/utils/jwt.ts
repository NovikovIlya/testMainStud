import { getUnixTime } from './date'

export interface IAuthTokenInfo {
	exp: number
	iat: number
	login: string
}

const LIFE_TO_UPDATE_MULTIPLIER = 0.5

export const isTokenExpired = (token: string | null): boolean => {
	if (token === null) {
		return false
	}

	try {
		const tokenInfo = token.split('.')[1] //достаем среднюю часть токена: login, lat, exp
		const tokenInfoDecoded = window.atob(tokenInfo) //раскодирование данных
		const { exp }: IAuthTokenInfo = JSON.parse(tokenInfoDecoded) //извлечение в соответствующие переменные

		// console.log(exp - getUnixTime())

		//берем время до которого живет токен и вычитаем из него текущее время
		return exp - getUnixTime() <= 0
	} catch (e) {
		console.error(e)
		return true
	}
}
