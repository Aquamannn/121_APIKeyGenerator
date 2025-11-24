import { useState } from 'react';

const UserPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [generatedKey, setGeneratedKey] = useState(''); // Menampung key sementara
  
  // 1. Fungsi Generate Key (Hanya menampilkan, belum simpan)
  const handleGenerate = () => {
    const randomKey = 'key-' + Math.random().toString(36).substring(2, 10) + Math.random().toString(36).substring(2, 10);
    setGeneratedKey(randomKey);
  };

  // 2. Fungsi Simpan ke Admin
  const handleSave = () => {
    // Validasi: Cek apakah user sudah mengisi data DAN sudah generate key
    if (!formData.firstName || !formData.email || !generatedKey) {
      alert("Mohon lengkapi data dan tekan tombol Generate Key terlebih dahulu!");
      return;
    }

    // Buat data user lengkap
    const newUser = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      apikey: generatedKey,
      status: 'Aktif',
      createdAt: new Date().toISOString()
    };

    // Simpan ke LocalStorage
    const existingUsers = JSON.parse(localStorage.getItem('database_users') || "[]");
    existingUsers.push(newUser);
    localStorage.setItem('database_users', JSON.stringify(existingUsers));

    alert("SUKSES! Data User dan API Key berhasil disimpan ke Database Admin.");
    
    // Reset Form (Opsional)
    setFormData({ firstName: '', lastName: '', email: '' });
    setGeneratedKey('');
  };

  return (
    // Container Utama: Background PUTIH, Teks HITAM (Supaya terbaca jelas)
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', padding: '40px', fontFamily: 'Arial' }}>
      
      <div style={{ maxWidth: '600px', margin: 'auto', border: '1px solid #ccc', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333', textAlign: 'center' }}>Registrasi Pengguna Baru</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Isi data diri, Generate Key, lalu Simpan.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          
          {/* Input Data Diri */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nama Depan:</label>
            <input type="text" value={formData.firstName} placeholder="Masukkan Nama Depan" 
              onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #999', borderRadius: '5px', backgroundColor: '#fff', color: '#000' }} 
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Nama Belakang:</label>
            <input type="text" value={formData.lastName} placeholder="Masukkan Nama Belakang" 
              onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #999', borderRadius: '5px', backgroundColor: '#fff', color: '#000' }} 
            />
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email:</label>
            <input type="email" value={formData.email} placeholder="email@anda.com" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              style={{ width: '100%', padding: '10px', border: '1px solid #999', borderRadius: '5px', backgroundColor: '#fff', color: '#000' }} 
            />
          </div>

          <hr style={{ margin: '20px 0', borderTop: '2px dashed #ccc' }} />

          {/* Bagian API Key */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
             <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>API Key Anda:</label>
                <input 
                  type="text" 
                  value={generatedKey} 
                  readOnly 
                  placeholder="Tekan tombol Generate..."
                  style={{ width: '100%', padding: '10px', border: '1px solid #999', borderRadius: '5px', backgroundColor: '#f0f0f0', color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }} 
                />
             </div>
             <button 
                onClick={handleGenerate}
                style={{ padding: '12px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', height: '42px' }}
             >
                Generate Key
             </button>
          </div>

          {/* Tombol Simpan Akhir */}
          <button 
            onClick={handleSave} 
            style={{ marginTop: '20px', padding: '15px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
          >
            Simpan Data User dan API Key
          </button>

        </div>
      </div>
    </div>
  );
};

export default UserPage;