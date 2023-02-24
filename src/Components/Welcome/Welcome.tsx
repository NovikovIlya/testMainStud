import { useState } from 'react';
import {Link} from 'react-router-dom';
import EllipseLeft from './../../Images/Ellipse2.png';
import EllipseRight from './../../Images/Ellipse.png';
import classNames from 'classnames';
import './Welcome.scss';

const Welcome = () => {
  const [Language, ChangeLanguage] = useState("RU");

  return (
    <div className='General'>
      <img className='LeftImg' src={EllipseLeft} alt=""/>
      <img className='RightImg' src={EllipseRight} alt=""/>
      <div className='TopBlock'>
        <div className='FirstBlock'>
          <div className='MainText'>{Language==="RU" ? "Добро пожаловать" : "Check mail"}</div>
          <div className="LanguageMenu">
            <button 
              className={Language==="RU" ? classNames("Button", "text-blue-700") : "Button"} 
              onClick={() => ChangeLanguage("RU")}>
                RU
            </button>
            <button 
              className={Language==="EN" ? classNames("Button", "text-blue-700") : "Button"}
              onClick={() => ChangeLanguage("EN")}
              >
                EN
            </button>
          </div>
        </div>
        <div className='TextBlock'>
          {Language==="RU"
            ? "Заполняйте анкету, знакомьтесь с курсами, подавайте заявки (здесь нужен интересный текст о том, что может делать пользователь)"
            : "Fill out the questionnaire, get acquainted with the courses, apply (here you need an interesting text about what the user can do)"
          }
        </div>  
        <Link 
          to ="/"
          className='But'
          >{Language==="RU" ? "Пожалуй, начнем" : "Let's start"}</Link>
      </div>
      <div className='BottomBlock'>
        <div className={"Navigate"}>
            <div className={"Question"}>{Language==="RU" ? "Уже есть профиль?" : "Already have a profile?"}</div>
            <Link to={"/"} className={"Link"}>{Language==="RU" ? "Войдите" : "Sign in"}</Link>
          </div>
      </div>
    </div>
  );
}

export default Welcome;