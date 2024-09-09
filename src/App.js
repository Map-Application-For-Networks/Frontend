import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddMarkerPage from './pages/AddMarkerPage';
import ConfimationPage from './pages/ConfirmationPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/addmarker" element={<AddMarkerPage />}> </Route>
        <Route path="/confirmation" element ={<ConfimationPage />}> </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
