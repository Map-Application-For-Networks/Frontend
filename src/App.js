import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import AddMarkerPage from './pages/AddMarkerPage/AddMarkerPage';
import ConfimationPage from './pages/ConfirmationPage/ConfirmationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import AdminPanel from './pages/AdminPanel/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/addmarker" element={<AddMarkerPage />}> </Route>
        <Route path="/confirmation" element ={<ConfimationPage />}> </Route>
        <Route path="/error" element ={<ErrorPage />}> </Route>
        <Route path="/login" element={<LoginPage />}> </Route>
        <Route path="/signup" element={<SignupPage />}> </Route>
        <Route path="/admin" element={
            <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute> }> </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
