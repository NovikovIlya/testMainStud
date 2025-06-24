export const getBaseUrlShelly = () => {
	const { hostname } = window.location;
	// Для Vercel (тест)!
	if (hostname.includes('vercel.app') || hostname.includes('vector')) {
	  return 'https://portal-dis.kpfu.ru/';
	}
	
	// Для локального окружения
	if (hostname === 'localhost' || hostname === '127.0.0.1') {
	  return 'https://portal-dis.kpfu.ru/'; // ваш локальный URL
	}
  
	// По умолчанию для продакшена
	return 'https://shelly.kpfu.ru/';
  };