import './ChangePass.scss';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { Input } from 'antd';
import {CloseOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import LeftBottomEllipse from './../../Images/Ellipse2.png';
import RightBottomEllipse from './../../Images/Ellipse.png';
import classNames from 'classnames';

const ChangePass = () => {
  const [Language, ChangeLanguage] = useState("RU");
  const [Pass, ChangePass] = useState("");
  const [SecPass, ChangeSecPass] = useState("");
  const [Error, ChangeError] = useState({
    Pass: false,
    SecPass: false
  });
  const [ActiveBut, ChangeActive] = useState(false);

  useEffect(() => {
    if (Pass.length>0 && SecPass.length>0){
      ChangeActive(true);
    }else{
      if (ActiveBut){
        ChangeActive(false);
      }
      ChangeError({Pass:false, SecPass:false})
    }
  }, [Pass.length, SecPass.length, ActiveBut]);

  const CheckInputs = () => {
    if (Pass!==SecPass){
      ChangeError(el => ({Pass: el.Pass, SecPass: true}));
    }
  }

  return (
    <div className='General'>
      <img className='LeftBotImg' src={LeftBottomEllipse} alt="" />
      <img className='RightBotImg' src={RightBottomEllipse} alt="" />

      <div className='TopBlock'>
        <div className='MainBlock'>
          {Language==="RU"
            ? <div className='TextBlock'>Введите новый пароль</div>
            : <div className='TextBlock'>Enter a new password</div>
          }
          <CloseOutlined className='CloseIco'/>
        </div>
      </div>

      <div className='MiddleBlock'>
        <div className='InputBlock'>
          <div className={Pass.length>0 ? 'Caption' : 'hidden'}>
            {Language==="RU" ? "Новый пароль" : "New password"}
          </div>
          <Input.Password 
            className={Error.Pass
              ? classNames('border-red-500 border-2', 'Input')
              : Pass.length > 0
                ? classNames('Input', 'pt-4')
                : 'Input'
            }
            placeholder={Language==="RU" ? "Новый пароль" : "New password"}
            value={Pass}
            onChange={el => ChangePass(el.target.value)}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          <div className={Error.Pass ? classNames('SomeTextBlock', 'text-red-500') : classNames('SomeTextBlock', 'text-gray-400')}>
            {Language==="RU"
              ? "Пароль должен содержать от 8 символов, буквы верхнего и нижнего регистра, а также цифры"
              : "Password must contain at least 8 characters, upper and lower case letters and numbers"
            }
          </div>
        </div>
        <div className='InputBlock'>
          <div className={SecPass.length>0 ? 'Caption' : 'hidden'}>
            {Language==="RU" ? "Повторите пароль" : "Repeat the password"}
          </div>
          <Input.Password 
            className={Error.SecPass
              ? classNames('border-red-500 border-2', 'Input', 'pt-4')
              : SecPass.length > 0
                ? classNames('Input', 'pt-4')
                : 'Input'
            }
            placeholder={Language==="RU" ? "Повторите пароль" : "Repeat the password"}
            value={SecPass}
            onChange={el => ChangeSecPass(el.target.value)}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
          {Error.SecPass && <div className={classNames('SomeTextBlock', 'text-red-500')}>
            {Language==="RU"
              ? "Пароли не совпадают - попробуйте еще раз"
              : "Passwords do not match - try again"
            }  
          </div>}
        </div>
      </div> 

      <div className='BottomBlock'>
        <button 
        className={ActiveBut ? classNames('Button', 'border-solid border-2 border-blue-700 bg-white text-blue-700') : classNames('Button', 'bg-gray-300 text-gray-400')}
        disabled={!ActiveBut}
        onClick={() => ActiveBut ? CheckInputs() : ""}>
          {Language==="RU"
            ? "Далее"
            : "Next"
          }
        </button>

        <div className='LinkBlock'>
          <div className='Navigate'>
            <div className='Question'>
              {Language==="RU"
                ? "Уже есть профиль?"
                : "Already have a profile?"
              }
            </div>
            <Link to="/" className='Link'>
              {Language==="RU"
                ? "Войдите"
                : "Sign in"
              }
            </Link>
          </div>
          <div className='BlockMenu'>
            <button
              className={Language==="EN" ? classNames('LanguageType', 'text-white') : classNames('LanguageType', 'text-black')}
              onClick={() => ChangeLanguage("EN")}>
              EN
            </button>
            <button
              className={Language==="RU" ? classNames('LanguageType', 'text-white') : classNames('LanguageType', 'text-black')}
              onClick={() => ChangeLanguage("RU")}>
              RU
            </button>
          </div>
        </div>
      </div> 
    </div>
  );
}

export default ChangePass;