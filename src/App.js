import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Scenes/Home/Home';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Signup from './Components/Scenes/Register/Signup';
import Login from './Components/Scenes/Register/Login';
import Jobs from './Components/Scenes/Jobs/Jobs';
import './Components/Global/Sketlon/Sketlon.css'
import ChooseSignUp from './Components/Scenes/Register/ChooseSignUp';
import Profile from './Components/Scenes/Profile/Profile';
import { useState, createContext } from 'react';
 import {token,UserInfos } from './Components/Global/Config';
 import {theme} from './Components/Global/Theme'
 const InfoGlobal = createContext();
function App() {
  const [infos,setInfos]=useState({token,UserInfos})
  const updateContext=(newContext)=>{
    setInfos(newContext)
  }
  return (
    <InfoGlobal.Provider value={infos}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home  updateContext={updateContext} />} />
              <Route path='/chooseToBe' element={<ChooseSignUp />} />
              <Route path='/signup' element={<Signup updateContext={updateContext}/>} />
              <Route path='/login' element={<Login updateContext={updateContext}/>} />
              <Route path='/Jobs' element={<Jobs updateContext={updateContext}/>} />
              <Route path='/profile/:username' element={<Profile updateContext={updateContext} />}/>
              <Route path='/profile' element={<Profile updateContext={updateContext}/>} />
              {/* <Route path='/profile/:username/Edit' element={<ProfileEdit/>}/> */}
              {/* <Route path='/profile/saved' element={<SavedJobs />} /> */}
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </InfoGlobal.Provider>
  );
}

export default App;
export { InfoGlobal }

