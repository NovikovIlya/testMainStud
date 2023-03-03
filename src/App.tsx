import { Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Login } from "./components/login/Login";
import { Registration } from "./components/registration/Registration";

const App = () => {
  return (
    <>
      <main>
        <Header />
        <Routes>
          <Route path="/*" element={<Login />} />
          <Route path="/registration/*" element={<Registration />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
