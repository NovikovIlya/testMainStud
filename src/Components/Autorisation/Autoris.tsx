import './Autoris.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CloseOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import LeftWallEllipse from './../../Images/Ellipse3.png';
import classNames from 'classnames';

const Autoris = () => {
  const [Language, ChangeLanguage] = useState('RU');
  const [EmailValue, ChangeEmail] = useState('');
  const [PassValue, ChangePass] = useState('');
  const [ActivateButton, ChangeActivate] = useState(false);
  const [RememberPass, ChangeRemember] = useState(false);
  const [IsSend, ChangeSend] = useState(true);
  const [Error, ChangeError] = useState({
    EmailError: false,
    PassError: false,
  });

  useEffect(() => {
    if (EmailValue.length > 0 && PassValue.length > 0) {
      ChangeActivate(true);
      ChangeError({ EmailError: false, PassError: false });
    } else {
      ChangeActivate(false);
    }
  }, [EmailValue.length, PassValue.length]);

  const CheckInputs = () => {
    if (EmailValue.length === 0) {
      ChangeError((el) => ({
        EmailError: true,
        PassError: el.PassError,
      }));
    }
    if (PassValue.length === 0) {
      ChangeError((el) => ({
        EmailError: el.EmailError,
        PassError: true,
      }));
    }
  };

  const GoBack = () => {
    ChangeEmail('');
    ChangeRemember(false);
    ChangeSend(true);
  };

  return (
    <div className='Autoris__General'>
      <div className='TopBlock'>
        <img className='Img' src={LeftWallEllipse} alt='' />
        <div className='LanguageMenu'>
          <button
            onClick={() => ChangeLanguage('RU')}
            className={Language === 'RU' ? classNames('Button', 'text-blue-700') : 'Button'}
          >
            RU
          </button>
          <button
            onClick={() => ChangeLanguage('EN')}
            className={Language === 'EN' ? classNames('Button', 'text-blue-700') : 'Button'}
          >
            EN
          </button>
        </div>
        <Link to='/' className='CloseLink'>
          <CloseOutlined className='CloseIcon' />
        </Link>
      </div>
      <div className='MiddleBlock'>
        <div
          className={
            RememberPass
              ? classNames('MainText', 'justify-start')
              : classNames('MainText', 'justify-center')
          }
        >
          {RememberPass
            ? Language === 'RU'
              ? 'Напомнить пароль'
              : 'Remember password'
            : Language === 'RU'
            ? 'Авторизация'
            : 'Autorisation'}
        </div>
        <div className='InputBlock'>
          <div className={RememberPass ? (IsSend ? 'SeparateInput' : 'hidden') : 'SeparateInput'}>
            <div className={EmailValue.length > 0 ? 'Caption' : 'hidden'}>
              {RememberPass
                ? Language === 'RU'
                  ? 'Электронная почта'
                  : 'E-mail'
                : Language === 'RU'
                ? 'Логин/E-mail'
                : 'Login/E-mail'}
            </div>
            <Input
              className={
                EmailValue.length > 0
                  ? classNames('input', 'pt-4')
                  : Error.EmailError
                  ? classNames('inputs', 'border-2 border-red-500')
                  : 'input'
              }
              allowClear
              placeholder={Language === 'RU' ? 'Логин/E-mail' : 'Login/E-mail'}
              value={EmailValue}
              onChange={(el) => ChangeEmail(el.target.value)}
            />
            {Error.EmailError && (
              <div className='ErrorText'>
                {RememberPass
                  ? Language === 'RU'
                    ? 'Пожалуйста, введите Ваш e-mail'
                    : 'Please enter your e-mail'
                  : Language === 'RU'
                  ? 'Логин/E-mail'
                  : 'Login/E-mail'}
              </div>
            )}
          </div>
          {!IsSend && RememberPass && (
            <div className='flex w-full h-auto flex-wrap'>
              {Language === 'RU'
                ? 'На указанную Вами почту было направлено письмо с инструкцией'
                : 'An email with instructions has been sent to your email address'}
            </div>
          )}
          <div className={RememberPass ? 'hidden' : 'SeparateInput'}>
            <div className={PassValue.length > 0 ? 'Caption' : 'hidden'}>
              {Language === 'RU' ? 'Пароль' : 'Password'}
            </div>
            <Input.Password
              className={
                PassValue.length > 0
                  ? classNames('input', 'pt-4')
                  : Error.PassError
                  ? classNames('inputs', 'border-2 border-red-500')
                  : 'input'
              }
              placeholder={Language === 'RU' ? 'Пароль' : 'Password'}
              value={PassValue}
              onChange={(el) => ChangePass(el.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {Error.PassError && (
              <div className='ErrorText'>
                {Language === 'RU' ? 'Укажите пароль' : 'Enter password'}
              </div>
            )}
          </div>
        </div>
        <div
          className={RememberPass ? 'hidden' : 'ForgetPass'}
          onClick={() => {
            ChangeRemember(!RememberPass);
            ChangeEmail('');
          }}
        >
          {Language === 'RU' ? 'Не помню пароль' : 'I do not remember the password'}
        </div>
        {RememberPass && (
          <button
            className={EmailValue.length > 0 ? 'ActiveButton' : 'PassiveButton'}
            disabled={EmailValue.length === 0}
            onClick={() =>
              !ActivateButton
                ? IsSend
                  ? EmailValue.length > 0
                    ? ChangeSend(false)
                    : ChangeError((el) => ({ EmailError: true, PassError: el.PassError }))
                  : GoBack()
                : ''
            }
          >
            {IsSend
              ? Language === 'RU'
                ? 'Отправить'
                : 'Send'
              : Language === 'RU'
              ? 'Закрыть'
              : 'Close'}
          </button>
        )}
        {!RememberPass && (
          <button
            className={ActivateButton ? 'ActiveButton' : 'PassiveButton'}
            disabled={!ActivateButton}
            onClick={() => (!ActivateButton ? CheckInputs() : '')}
          >
            {Language === 'RU' ? 'Войти' : 'Enter'}
          </button>
        )}
      </div>
      <div className='BottonBlock'>
        <div className='BottonBlock__Navigare'>
          {Language === 'RU' ? (
            <div className='Navigate__Question'>Нет профиля?</div>
          ) : (
            <div className='Navigate__Question'>Do you don't have a profile?</div>
          )}
          <Link to='/registration' className='Navigate__Link'>
            {Language === 'RU' ? 'Зарегистрируйтесь' : 'Register'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Autoris;
