import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AdminAuth from './pages/AdminAuth';
import AdminDashboard from './pages/AdminDashboard';

// Komponen Private Route
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/admin" />;
};

function App() {
  return (
    <Router>
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* NAVIGASI */}
        <nav style={{ 
          width: '100%', 
          padding: '15px 30px', 
          background: '#333', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center',
          gap: '20px', // Jarak antar tombol
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          
          {/* Tulisan "Sistem Musik" SUDAH DIHAPUS */}

          {/* Tombol Web User (DIKEMBALIKAN) */}
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            Web User
          </Link>

          {/* Tombol Web Admin */}
          <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
            Web Admin
          </Link>

        </nav>

        {/* AREA KONTEN */}
        <div style={{ flex: 1, width: '100%' }}>
          <Routes>
            <Route path="/" element={<UserPage />} />
            <Route path="/admin" element={<AdminAuth />} />
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