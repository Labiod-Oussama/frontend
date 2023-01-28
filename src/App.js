import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './Components/Scenes/Home/Home';
import { createTheme, ThemeProvider } from '@mui/material';
function App() {
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
         main:'#C6F16D',
        light:'#ab7a5f',
      },
      secondary: {
         main: '#1D2124',
        
      },
    },
  });
  return (
    <div className="App">
    <ThemeProvider theme={theme}>  
      <BrowserRouter>
         <Routes>
          <Route path="/"  element={<Home/>}/>
         </Routes>
      </BrowserRouter>
      </ThemeProvider>
       
    </div>
  );
}

export default App;
