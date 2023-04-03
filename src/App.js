import React, { useEffect, useState, useContext } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { customTheme, antellTheme } from "./styles/themes";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import Comprobantes from "./pages/Comprobantes/Comprobantes";
import SnackBarAlert from "./components/snackbarAlert/SnackBarAlert";
import SignUp from "./pages/Form/SignUp";
import { UserInfoContext } from "./service/UserInfoContext";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import RedirectAccessToken from "./pages/RedirectAccessToken/RedirectAccessToken";
import './App.css';
import Consulta from "./pages/Consulta/Consulta";

function App() {
  const [userInfoState, updateUserInfoState] = useState({});
  const { state } = useContext(UserInfoContext);
  const [location, setLocation] = useState(window.location.origin);
  const [theme, setTheme] = useState(customTheme);

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem('isLoggin')) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  useEffect(() => {
    if (location.includes("modiga")) {
      setTheme(customTheme);
    } else if (location.includes("antell")) {
      setTheme(antellTheme);
    }
  }, []);

  return (
    <UserInfoContext.Provider value={{ state: userInfoState, update: updateUserInfoState }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <div className="App">
          <SnackBarAlert />
          <BrowserRouter>
            <Routes>
              {location.includes("antell") &&
                <>
                  <Route path='/consultacomprobante' element={<Consulta />} />
                </>
              }
              <><Route path='/' element={<Login />} />
                <Route path='/comprobantes' element={<RedirectAccessToken />} />
                <Route path='/registrarme' element={<SignUp />} />
                <Route path='/listacomprobantes' element={<Navbar />}>
                  <Route index element={<ProtectedRoute>
                    <Comprobantes />
                  </ProtectedRoute>} />
                </Route>
                <Route path='*' element={<Login />} />
              </>

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </UserInfoContext.Provider>
  );



}

export default App;
