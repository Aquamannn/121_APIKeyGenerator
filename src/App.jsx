import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';

// Komponen untuk mengamankan Dashboard
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <Router>
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* NAVIGASI: Hanya tombol Web Admin di sebelah kanan */}
        <nav style={{ 
          width: '100%', 
          padding: '15px 30px', 
          background: '#333', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'flex-end', // Posisi di Kanan
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            Web Admin
          </Link>

        </nav>

        {/* AREA KONTEN */}
        <div style={{ flex: 1, width: '100%' }}>
          <Routes>
            {/* Halaman User (Default saat dibuka) */}
            <Route path="/" element={<UserPage />} />
            
            {/* Halaman Login Admin */}
            <Route path="/admin" element={<AdminAuth />} />
            
            {/* Halaman Dashboard (Terkunci) */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;