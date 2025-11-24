import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
  const [isRegister, setIsRegister] = useState(false); 
  const navigate = useNavigate();
  const [input, setInput] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();
    if(!input.email || !input.password) return alert("Isi semua data!");
    
    // Simpan akun admin baru (menimpa yang lama untuk demo ini)
    localStorage.setItem('adminAccount', JSON.stringify(input));
    
    alert("Registrasi Berhasil! Silahkan Login.");
    setIsRegister(false); 
    setMsg('');
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem('adminAccount'));

    if (savedUser && savedUser.email === input.email && savedUser.password === input.password) {
      localStorage.setItem('isLoggedIn', 'true'); 
      setMsg('Login successful... Mengalihkan...');
      setTimeout(() => {
        navigate('/admin/dashboard'); 
      }, 1000);
    } else {
      alert("Email atau Password salah/belum terdaftar!");
    }
  };

  return (
    // CONTAINER UTAMA: Paksa Background PUTIH & Teks HITAM
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', paddingTop: '50px', fontFamily: 'Arial' }}>
      
      <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #ddd', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Admin {isRegister ? 'Register' : 'Login'}
        </h1>
        
        <form onSubmit={isRegister ? handleRegister : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Input Email */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Email:</label>
            <input 
              type="email" 
              value={input.email}
              placeholder="Masukkan Email"
              onChange={(e) => setInput({...input, email: e.target.value})} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', color: '#000', fontSize: '14px' }}
            />
          </div>

          {/* Input Password */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#333' }}>Password:</label>
            <input 
              type="password" 
              value={input.password}
              placeholder="Masukkan Password"
              onChange={(e) => setInput({...input, password: e.target.value})} 
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff', color: '#000', fontSize: '14px' }}
            />
          </div>

          {/* Tombol Action */}
          <button type="submit" style={{ padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>
            {isRegister ? 'Daftar Admin' : 'Masuk'}
          </button>

        </form>

        {msg && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{msg}</p>}

        <div style={{ marginTop: '25px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
            <span 
              onClick={() => setIsRegister(!isRegister)} 
              style={{ color: '#007BFF', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              {isRegister ? "Login di sini" : "Register di sini"}
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default AdminAuth;