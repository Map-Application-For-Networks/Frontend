import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddMarkerPage from './pages/AddMarkerPage';
import ConfimationPage from './pages/ConfirmationPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminPanel from './pages/AdminPanel';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/addmarker" element={<AddMarkerPage />}> </Route>
        <Route path="/confirmation" element ={<ConfimationPage />}> </Route>
        <Route path="/login" element={<LoginPage />}> </Route>
        <Route path="/signup" element={<SignupPage />}> </Route>
        <Route path="/admin" element={<AdminPanel />}> </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
