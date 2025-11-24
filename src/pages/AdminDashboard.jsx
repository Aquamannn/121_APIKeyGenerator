import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('database_users');
    if (storedData) {
      setDataUser(JSON.parse(storedData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    navigate('/admin'); 
  };

  const handleDelete = (id) => {
    if(window.confirm("Yakin hapus user ini?")) {
      const updatedData = dataUser.filter(user => user.id !== id);
      setDataUser(updatedData);
      localStorage.setItem('database_users', JSON.stringify(updatedData));
    }
  };

  return (
    // PAKSA BACKGROUND PUTIH DAN TEXT HITAM
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', padding: '20px', fontFamily: 'Arial' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h1 style={{ margin: 0, color: '#333' }}>Dashboard Admin</h1>
        <button onClick={handleLogout} style={{ background: '#d9534f', color: 'white', border: 'none', padding: '10px 25px', cursor: 'pointer', borderRadius: '5px', fontWeight: 'bold' }}>
          Logout
        </button>
      </div>

      <div style={{ overflowX: 'auto', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', backgroundColor: '#fff', color: '#000', borderColor: '#ddd' }}>
          <thead style={{ background: '#343a40', color: '#ffffff', textAlign: 'left' }}>
            <tr>
              <th>ID</th>
              <th>Nama Depan</th>
              <th>Nama Belakang</th>
              <th>Email</th>
              <th>API Key</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataUser.length > 0 ? (
              dataUser.map((user, index) => (
                <tr key={user.id || index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td style={{ fontFamily: 'monospace', color: '#0056b3', fontWeight: 'bold' }}>{user.apikey}</td>
                  <td>
                    <span style={{ 
                      padding: '5px 12px', 
                      borderRadius: '20px', 
                      background: user.status === 'Aktif' ? '#d4edda' : '#f8d7da',
                      color: user.status === 'Aktif' ? '#155724' : '#721c24',
                      fontWeight: 'bold'
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                  Belum ada data user. Silakan input dari halaman User Page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;