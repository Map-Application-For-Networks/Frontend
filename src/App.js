import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddMarkerPage from './pages/AddMarkerPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}> </Route>
        <Route path="/blabla" element={<AddMarkerPage />}> </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
