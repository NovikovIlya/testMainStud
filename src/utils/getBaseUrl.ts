export const getBaseUrl = () => {
	const { hostname } = window.location;
	// Для Vercel (тест)!
	if (hostname.includes('vercel.app') || hostname.includes('vector')) {
	  return 'https://newlk-test.kpfu.ru/';
	}
	
	// Для локального окружения
	if (hostname === 'localhost' || hostname === '127.0.0.1') {
	  return 'https://newlk-test.kpfu.ru/'; // ваш локальный URL
	}
  
	// По умолчанию для продакшена
	return 'https://newlk.kpfu.ru/';
  };