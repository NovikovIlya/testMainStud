import './App.scss';
import {Routes, Route} from 'react-router-dom';
import RegComponent from './Components/Registration/Reg';
import AutorisComponent from './Components/Autorisation/Autoris';
import WelcomeComponent from './Components/Welcome/Welcome';

const App = () => {
  return (
    <div className="Main">
      <Routes>
        <Route path="/registration/*" element={<RegComponent />}/>
        <Route path="/*" element={<AutorisComponent />}/>
        <Route path="/welcome/*" element={<WelcomeComponent />}/>
      </Routes>
    </div>
  );
};


export default App;
