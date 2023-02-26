import './Reg.scss';
// import HeaderComponent from './Components/Header/Head';
import BodyComponent from './Components/Body/Body';
import EmailComponent from './Components/CheckEmail/CheckMail'; 
import {useState} from 'react';

const Reg = () => {
  const [ShowMainPage, ChangeShow] = useState(true);
  const [Email, ChangeEmail] = useState("");
  return (
    <div className="Reg__General">
      {ShowMainPage && <div className="Reg__Body"><BodyComponent SetEmail={ChangeEmail} ShowBody={ChangeShow}/></div>}
      {!ShowMainPage && <div className="Reg__CheckEmail"><EmailComponent Email={Email}/></div>}
    </div>
  );
}

export default Reg;