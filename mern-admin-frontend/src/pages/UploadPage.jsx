import { useState } from 'react';
import axios from 'axios';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!file) return setMessage('Please select a file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5050/api/uploads/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(`✅ ${res.data.message} (${res.data.total} tasks)`);
    } catch (err) {
      setMessage('❌ Upload failed: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <h2>Upload CSV or Excel File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload & Distribute</button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</p>}
    </div>
  );
}

export default UploadPage;
