import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Admin() {
  const navigate = useNavigate();
  const [motorcycles, setMotorcycles] = useState([]);
  
  // 1. Added 'image' to the state
  const [formData, setFormData] = useState({ make: '', model: '', price: '', image: '' });
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
    // Reset form including image
    setFormData({ make: '', model: '', price: '', image: '' });
    fetchMotorcycles();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this motorcycle?")) {
      await api.delete(`/motorcycle/${id}`);
      fetchMotorcycles();
    }
  };

  const handleEdit = (bike) => {
    setEditingId(bike.id);
    // When editing, populate the form with existing data, ensuring image isn't undefined
    setFormData({ 
      make: bike.make, 
      model: bike.model, 
      price: bike.price, 
      image: bike.image || bike.images || '' 
    });
  };

  return (
    <div className="container" style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '30px' }}>Admin Console: Inventory Management</h2>

      {/* ADD/EDIT FORM */}
      <div style={{ background: '#121215', padding: '30px', borderRadius: '10px', border: '1px solid #222', marginBottom: '40px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            placeholder="Make (e.g., Yamaha)" 
            value={formData.make} 
            onChange={(e) => setFormData({...formData, make: e.target.value})} 
            style={{ padding: '12px', background: '#0a0a0c', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
            required 
          />
          <input 
            placeholder="Model (e.g., TMAX 560)" 
            value={formData.model} 
            onChange={(e) => setFormData({...formData, model: e.target.value})} 
            style={{ padding: '12px', background: '#0a0a0c', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
            required 
          />
          <input 
            placeholder="Price" 
            type="number" 
            value={formData.price} 
            onChange={(e) => setFormData({...formData, price: e.target.value})} 
            style={{ padding: '12px', background: '#0a0a0c', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
            required 
          />
          
          {/* NEW: IMAGE URL INPUT */}
          <input 
            placeholder="Image URL (e.g., https://example.com/bike.jpg)" 
            type="text" 
            value={formData.image} 
            onChange={(e) => setFormData({...formData, image: e.target.value})} 
            style={{ padding: '12px', background: '#0a0a0c', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
            required 
          />

          <button type="submit" style={{ background: '#e63946', color: '#fff', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', width: '150px' }}>
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>
      </div>

      {/* INVENTORY TABLE */}
      <div style={{ background: '#121215', borderRadius: '10px', border: '1px solid #222', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: '#0a0a0c', borderBottom: '1px solid #222' }}>
            <tr>
              <th style={{ padding: '20px', color: '#888', fontSize: '0.8rem', letterSpacing: '1px' }}>MAKE & MODEL</th>
              <th style={{ padding: '20px', color: '#888', fontSize: '0.8rem', letterSpacing: '1px' }}>PRICE</th>
              <th style={{ padding: '20px', color: '#888', fontSize: '0.8rem', letterSpacing: '1px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {motorcycles.map(m => (
              <tr key={m.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '20px' }}>{m.make} {m.model}</td>
                <td style={{ padding: '20px' }}>${Number(m.price).toLocaleString()}</td>
                <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(m)} style={{ background: '#fff', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(m.id)} style={{ background: '#fff', color: '#e63946', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}