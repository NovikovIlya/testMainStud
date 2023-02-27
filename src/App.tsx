import { Routes, Route } from "react-router-dom";
import { Login } from "./zzz/login/Login";
import { Registration } from "./zzz/registration/Registration";

const App = () => {
  return (
    <>
      {/*<div className="Main">
        <Routes>
          <Route path="/registration/*" element={<RegComponent />} />
          <Route path="/*" element={<AutorisComponent />} />
          <Route path="/welcome/*" element={<WelcomeComponent />} />
          <Route path="/change_pass/*" element={<ChangePassComponent />} />
        </Routes>
      </div>*/}
      <main>
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/registration/*" element={<Registration />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
