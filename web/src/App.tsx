import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Index';
import RegisterPage from './pages/Register/Index';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/Home/Index';
import CompanyPage from './pages/Company/Index';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/company" element={<ProtectedRoute><CompanyPage /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;