import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Scenes/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material';
import Signup from './Components/Scenes/Register/Signup';
import Login from './Components/Scenes/Register/Login';
import Jobs from './Components/Scenes/Jobs/Jobs';
import './Components/Global/Sketlon/Sketlon.css'
import ChooseSignUp from './Components/Scenes/Register/ChooseSignUp';
import Profile from './Components/Scenes/Profile/Profile';
 function App() {
  const getCookie=(name)=> {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("token");
  const UserInfos=JSON.parse(localStorage.getItem('UserInfo'))
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          div {
            background-color: white;
          }
        `,
      },
    },
    typography:{
      fontFamily:'Yusei Magic'
    },

    palette: { 
      primary: {
         main:'#144272',
        light:'#ab7a5f',
      },
      secondary: {
         main: '#1D2124',
         grey:'#5E737D'
        
      },
    },
  });
  
  return (
    <div className="App">
    <ThemeProvider theme={theme}>  
      <BrowserRouter>
         <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/chooseToBe' element={<ChooseSignUp/>} />
          <Route path='/signup' element={<Signup/>}/>
           <Route path='/login' element={<Login/>}/>
          <Route path='/Jobs' element={<Jobs token={token} UserInfos={UserInfos}/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
          <Route path='/profile' element={<Profile/>}/>
          </Routes>
      </BrowserRouter>
      </ThemeProvider>
       
    </div>
  );
}

export default App;
