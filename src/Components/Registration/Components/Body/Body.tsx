import React, {useState, useEffect} from 'react';
import './Body.scss';
import Ellipse from './../../../../Images/Ellipse.png';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import {Input} from 'antd';
import classNames from 'classnames';
import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Link } from 'react-router-dom';


interface Props{
  SetEmail: (arg: string) => void;
  ShowBody: (arg: boolean) => void; 
}


const Body:React.FC<Props> = (props) => {
  const [Language, ChangeLanguage] = useState("RU");//изменение языка
  const [Name, ChangeName] = useState("");//изменение имени персона
  const [SecName, ChangeSecName] = useState("");// изменение фамилии персона
  const [Country, ChangeCountry] = useState("");// изменение страны персона
  const [Email, ChangeEmail] = useState("");// изменеие данных ввода для (телефона\почты)
  const [Password, ChangePassword] = useState("");// изменение пароля (первый input)
  const [SecPassword, ChangeSecPassword] = useState("");// изменение пароля (второй input)
  const [disabled, ChangeDisabled] = useState(false);//это нужно чтобы подсветить кнопку при условии, которое в useEffect
  const [Error, ChangeError] = useState({
    Name: false,
    SurName: false,
    Country: false,
    Email: false,
    Pas: false,
    SecPas: false
  });

  const ChangeCheckBox = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  useEffect(() => {
    if (Name.length > 0 && SecName.length > 0 && Email.length > 0 && Password.length > 0 && SecPassword.length > 0 && Country.length > 0){
      ChangeDisabled(true);
      ChangeError({Name: false, SurName:false, Country:false, Email: false, Pas:false, SecPas:false});
    }else{
      ChangeDisabled(false);
    }
  }, [Name.length, SecName.length, Email.length, Password.length, SecPassword.length, Country.length]);

  const CheckInputs = () => {
        if (Name.length === 0){
          ChangeError(el => ({
            Name: true,
            SurName: el.SurName,
            Country: el.Country,
            Email: el.Email,
            Pas: el.Pas,
            SecPas: el.SecPas
        }))}
        if (SecName.length === 0){
          ChangeError(el => ({
            Name: el.Name,
            SurName: true,
            Country: el.Country,
            Email: el.Email,
            Pas: el.Pas,
            SecPas: el.SecPas
        }))}
        if (Email.length === 0){
          ChangeError(el => ({
            Name: el.Name,
            SurName: el.SurName,
            Country: el.Country,
            Email: true,
            Pas: el.Pas,
            SecPas: el.SecPas
        }))}
        if (Country.length === 0){
          ChangeError(el => ({
            Name: el.Name,
            SurName: el.SurName,
            Country: true,
            Email: el.Email,
            Pas: el.Pas,
            SecPas: el.SecPas
        }))}
        if (Password.length === 0){
          ChangeError(el => ({
            Name: el.Name,
            SurName: el.SurName,
            Country: el.Country,
            Email: el.Email,
            Pas: true,
            SecPas: el.SecPas
        }))}
        if (SecPassword.length === 0){
          ChangeError(el => ({
            Name: el.Name,
            SurName: el.SurName,
            Country: el.Country,
            Email: el.Email,
            Pas: el.Pas,
            SecPas: true
        }))}
  }
  return (
      <div className="Reg__Body">
        <img src={Ellipse} alt="" className="Img"/>
        <div className="InputBlock">
          <div className="TopBlock">
            <div className="MainText">{Language==="RU" ? "Регистрация" : "Registration"}</div>
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
          <div className='Block'>
            <div className={SecName.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? 'Фамилия' : 'Surname'} 
            </div>
            <Input 
            className={Error.SurName
              ? classNames("Inputs", "border-red-600 border-2")
              : SecName.length > 0
                ? classNames("Inputs", "pt-4")
                : "Inputs"
            } 
            placeholder={Language==="RU" ? 'Фамилия' : 'Surname'} 
            allowClear 
            onChange={el => ChangeSecName(el.target.value)} 
            value={SecName}
            />
            {Error.SurName && <div className="ErrorText">
              {Language==="RU"
                ? "Пожалуйста, введите фамилию"
                : "Please enter a surname"}
            </div>}
          </div>
          <div className='Block'>
            <div className={Name.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? "Имя" : "Name"} 
            </div>
            <Input 
            className={Error.Name 
              ? classNames("Inputs", "border-red-600 border-2") 
              : Name.length > 0
                ? classNames("Inputs", "pt-4")
                : "Inputs"
            } 
            placeholder={Language==="RU" ? "Имя" : "Name"} 
            allowClear 
            onChange={el => ChangeName(el.target.value)} 
            value={Name}
            />
            {Error.Name && <div className={"ErrorText"}>
              {Language==="RU"
                ? "Пожалуйста, введите имя"
                : "Please enter a name"
              }
            </div>}
          </div>
          <div className='Block'>
            <div className={Country.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? 'Страна гражданина' : "Citizen's country"} 
            </div>
            <Input 
            className={
              Error.Country 
              ? classNames("Inputs", "border-red-500 border-2") 
              : Country.length > 0
                ? classNames("Inputs", "pt-4")
                : "Inputs"
            } 
            placeholder={Language==="RU" ? 'Страна гражданина' : "Citizen's country"} 
            allowClear 
            onChange={el => ChangeCountry(el.target.value)} 
            value={Country}
            />
            {Error.Country && <div className={"ErrorText"}>
              {Language==="RU"
                ? "Пожалуйста, укажите страну"
                : "Please select a country"
              }
              </div>
            }
          </div>
          <div className='Block'>
            <div className={Email.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? "Электронная почта" : "Email"}
            </div>
            <Input 
            className={Error.Email 
              ? classNames("Inputs", "border-red-500 border-2") 
              : Email.length > 0
                ? classNames("Inputs", "pt-4")
                : "Inputs"
            } 
            allowClear 
            onChange={el => ChangeEmail(el.target.value)} 
            value={Email} 
            placeholder={Language==="RU" ? "Электронная почта" : "Email"}
            />
            {Error.Email && <div className={"ErrorText"}>
              {Language==="RU"
                ? "E-mail не найден. Проверьте введенные данные"
                : "Email not found. Check the entered data"
              }
            </div>}
          </div>
          <div className='Block'>
            <div className={Password.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? "Пароль" : "Password"}
            </div>
            <div className='w-full'>
              <Input.Password
                className={Error.Pas 
                  ? classNames("Inputs", "border-red-500 border-2") 
                  : Password.length > 0
                    ? classNames("Inputs", "pt-4")
                    : "Inputs"
                }
                placeholder={Language==="RU" ? "Пароль" : "Password"}
                value={Password}
                onChange={el => 
                ChangePassword(el.target.value)
                }
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
              <div className={Error.Pas ? classNames("TextUnderPass", "text-red-500") : classNames("TextUnderPass", "text-gray-400")}>
                {Language==="RU" 
                  ? "Пароль должен содержать от 8 символов, буквы верхнего и нижнего регистра, а также цифры" 
                  : "Password must contain at least 8 characters, upper and lower case letters and numbers"
                }
            </div>
            </div>
          </div>
          <div className='Block'>
            <div className={SecPassword.length > 0 ? 'VisibleCaption' : 'UnVisibleCaption'}>
              {Language==="RU" ? "Повторите пароль" : "Repeat password"}
            </div>
            <Input.Password
              className={Error.SecPas 
                ? classNames("Inputs", "border-red-500 border-2") 
                : SecPassword.length > 0
                  ? classNames("Inputs", "pt-4")
                  : "Inputs"
              }
              placeholder={Language==="RU" ? "Повторите пароль" : "Repeat password"}
              value={SecPassword}
              onChange={el => ChangeSecPassword(el.target.value)}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            {Error.SecPas && <div className={"ErrorText"}>
              {Language==="RU"
                ? "Пароли должны совпадать"
                : "Passwords must match"
              }
            </div>}
          </div>
          <button 
            className={disabled ? classNames("Button", "text-white bg-blue-700") : classNames("Button", "text-gray-400 bg-gray-300")} 
            disabled={!disabled}
            onClick={() => {CheckInputs(); props.SetEmail(Email); props.ShowBody(false)}}>
              {Language==="RU" 
                ? "Далее"
                : "Further"
              }
            </button>
          <Checkbox 
            onChange={ChangeCheckBox} 
            className={"CheckBox"}>
              {Language==="RU"
               ? "Я соглашаюсь на обработку персональных данных"
               : "I agree to the processing of personal data"
              }
          </Checkbox>
          <Checkbox 
            onChange={ChangeCheckBox} 
            className={"CheckBox"}>
              {Language==="RU"
                ? "Подтверждаю, что в случае предоставления ложной информации, мою учетную запись могут удалить"
                : "I confirm that if false information is provided, my account may be deleted"
              }
          </Checkbox>
          <div className={"Navigate"}>
            <div className={"Question"}>{Language==="RU" ? "Уже есть профиль?" : "Already have a profile?"}</div>
            <Link to={"/"} className={"Link"}>{Language==="RU" ? "Войдите" : "Sign in"}</Link>
          </div>
      </div>
    </div>
  );
}

export default Body;