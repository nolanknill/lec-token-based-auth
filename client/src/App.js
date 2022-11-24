import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;