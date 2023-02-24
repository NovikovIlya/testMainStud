import './CheckMail.scss';
import EllipseLeft from './../../../../Images/Ellipse2.png';
import EllipseRight from './../../../../Images/Ellipse.png';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import './CheckMail.scss';

interface Props{
  Email: String;
}

const CheckMail:React.FC<Props> = (props) => {
  const [ShowButton, ChangeShowButton] = useState(false);
  const [Language, ChangeLanguage] = useState("RU");
  const [Time, ChangeTime] = useState(30);

  useEffect(() => {
    if (Time !== 0){
      setTimeout(() => {ChangeTime(el => el-1)}, 1000);
    }else{
      ChangeShowButton(true);
    }
  }, [Time])
  return (
    <div className='Check_General'>
      <img className='Check_LeftImg' src={EllipseLeft} alt=""/>
      <img className='Check_RightImg' src={EllipseRight} alt=""/>
      <div className='Check_TopBlock'>
        <div className='Check_FirstBlock'>
          <div className='Check_MainText'>{Language==="RU" ? "Проверьте почту" : "Check mail"}</div>
          <div className="Check_LanguageMenu">
            <button 
              className={Language==="RU" ? classNames("Check_Button", "text-blue-700") : "Check_Button"} 
              onClick={() => ChangeLanguage("RU")}>
                RU
            </button>
            <button 
              className={Language==="EN" ? classNames("Check_Button", "text-blue-700") : "Check_Button"}
              onClick={() => ChangeLanguage("EN")}
              >
                EN
            </button>
          </div>
        </div>
        <div className='Check_TextBlock'>
          {Language==="RU"
            ? <div>Чтобы завершить регистрацию, перейдите на почту (<span className='font-bold'>{props.Email}</span>) и подтвердите учетную запись, нажав на ссылку в письме</div>
            : <div>To complete the registration, go to the mail (<span className='font-bold'>{props.Email}</span>) and confirm the account by clicking on the link in the letter</div>
          }
        </div>  
      </div>
      <div className='Check_BottomBlock'>
        {!ShowButton && <div className='Check_TextBlock'>
          {Language==="RU"
            ? <div>Если вы не получили письмо, нажмите «Отправить повторно» через <span>{Time}</span> сек. или напишите на GeoSup@kpfu.ru</div>
            : <div>If you didn't receive the email, click 'Resend' after <span>{Time}</span> sec. or write to GeoSup@kpfu.ru</div>
          }
        </div>
        }
        {ShowButton && <button 
          className='Check_But'
          onClick={() => {ChangeTime(30); ChangeShowButton(!ShowButton)}}
          >{Language==="RU" ? "Отправить повторно" : "Resend"}</button>
        }  
        <div className={"Check_Navigate"}>
            <div className={"Check_Question"}>{Language==="RU" ? "Уже есть профиль?" : "Already have a profile?"}</div>
            <Link to={"/"} className={"Check_Link"}>{Language==="RU" ? "Войдите" : "Sign in"}</Link>
          </div>
      </div>
    </div>
  );
}

export default CheckMail;