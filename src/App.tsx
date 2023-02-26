import './App.scss';
import {Routes, Route} from 'react-router-dom';
import RegComponent from './Components/Registration/Reg';
import AutorisComponent from './Components/Autorisation/Autoris';
import WelcomeComponent from './Components/Welcome/Welcome';
import ChangePassComponent from './Components/ChangePassword/ChangePass';

const App = () => {
  return (
    <div className="Main">
      <Routes>
        <Route path="/registration/*" element={<RegComponent />}/>
        <Route path="/*" element={<AutorisComponent />}/>
        <Route path="/welcome/*" element={<WelcomeComponent />}/>
        <Route path='/change_pass/*' element={<ChangePassComponent />}/>
      </Routes>
    </div>
  );
};


export default App;
