import { useLocalStorageState } from 'ahooks';
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [state, setState] = useLocalStorageState<any>(
    'cookieConsent',
    {
      defaultValue: '0'
    },
  );


  const handleAccept = () => {
    setState('1')
  }
  console.log('mainRole',accessToken)
  if (state === '1' || !accessToken) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 md:p-6 z-50 m-4 rounded-xl animate-fade-in">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-gray-600 text-sm md:text-base flex-1">
          Продолжая пользоваться сайтом, вы соглашаетесь на обработку файлов cookie и других пользовательских данных в соответствии с{' '}
          <a href="https://prepschool.kpfu.ru/content/uploads/2022/03/politika-konfidenczialnosti-1.docx" className="text-blue-500 hover:text-blue-600">
            политикой конфиденциальности
          </a>
          . Заблокировать использование cookies сайтом можно в настройках браузера.
        </p>
        <Button
          onClick={handleAccept}
          type='primary'
          className=""
        >
          Понятно
        </Button>
      </div>
    </div>
  );
};

export default CookieConsent;