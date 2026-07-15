import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Admin() {
  const navigate = useNavigate();
  const [motorcycles, setMotorcycles] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '', price: '', category: '', engine_cc: '', images: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchMotorcycles();
  }, [navigate]);

  const fetchMotorcycles = async () => {
    const res = await api.get('/motorcycle');
    setMotorcycles(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await api.put(`/motorcycle/${editingId}`, formData);
      setEditingId(null);
    } else {
      await api.post('/motorcycle', formData);
    }
    setFormData({ make: '', model: '', price: '', category: '', engine_cc: '', images: '' });
    fetchMotorcycles();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this bike?")) {
      await api.delete(`/motorcycle/${id}`);
      fetchMotorcycles();
    }
  };

  return (
    <div className="container" style={{ padding: '40px 20px' }}>
      <h2>Admin Console: Inventory Management</h2>

      {/* ADD/EDIT FORM */}
      <form onSubmit={handleSubmit} style={{ background: '#1a1a1f', padding: '20px', borderRadius: '8px', marginBottom: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input placeholder="Make" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} required />
        <input placeholder="Model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required />
        <input placeholder="Price" type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
        <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'}</button>
      </form>

      {/* TABLE WITH ACTIONS */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th>Make & Model</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #333' }}>
              <td>{m.make} {m.model}</td>
              <td>${m.price}</td>
              <td>
                <button onClick={() => { setEditingId(m.id); setFormData(m); }} style={{ marginRight: '10px' }}>Edit</button>
                <button onClick={() => handleDelete(m.id)} style={{ color: '#ef4444' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}