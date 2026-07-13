import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Admin() {
  const navigate = useNavigate();
  const [motorcycles, setMotorcycles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state for Create and Update
  const initialFormState = { make: '', model: '', price: '', category: '', engine_cc: '', images: '', description: '' };
  const [formData, setFormData] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  // 1. Security Check & Fetch Data
  useEffect(() => {
    const userString = localStorage.getItem('user');
    
    // Kick out unauthorized users
    if (!userString) {
      navigate('/auth');
      return;
    }
    
    const user = JSON.parse(userString);
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchMotorcycles();
  }, [navigate]);

  // READ: Fetch all motorcycles
  const fetchMotorcycles = async () => {
    try {
      const response = await api.get('/motorcycle');
      setMotorcycles(response.data);
    } catch (error) {
      console.error("Error fetching motorcycles:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // CREATE or UPDATE: Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update existing record
        await api.put(`/motorcycle/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Create new record
        await api.post('/motorcycle', formData);
      }
      setFormData(initialFormState); // Clear form
      fetchMotorcycles(); // Refresh the list
    } catch (error) {
      console.error("Error saving motorcycle:", error);
    }
  };

  // Populate form for updating
  const handleEdit = (moto) => {
    setEditingId(moto.id);
    setFormData(moto);
  };

  // DELETE: Remove a record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/motorcycle/${id}`);
        fetchMotorcycles(); // Refresh the list
      } catch (error) {
        console.error("Error deleting motorcycle:", error);
      }
    }
  };

  if (loading) return <h2>Verifying Admin Credentials...</h2>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Admin Dashboard - Inventory Management</h2>

      {/* CREATE / UPDATE FORM */}
      <div style={{ backgroundColor: '#f4f4f9', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h3>{editingId ? 'Edit Motorcycle' : 'Add New Motorcycle'}</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <input type="text" name="make" placeholder="Make (e.g., Yamaha)" value={formData.make} onChange={handleInputChange} required style={{ padding: '8px' }} />
          <input type="text" name="model" placeholder="Model (e.g., R1)" value={formData.model} onChange={handleInputChange} required style={{ padding: '8px' }} />
          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required style={{ padding: '8px' }} />
          <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required style={{ padding: '8px' }} />
          <input type="number" name="engine_cc" placeholder="Engine CC" value={formData.engine_cc} onChange={handleInputChange} required style={{ padding: '8px' }} />
          
          <div style={{ width: '100%' }}>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: editingId ? '#ffc107' : '#28a745', color: editingId ? 'black' : 'white', border: 'none', cursor: 'pointer' }}>
              {editingId ? 'Update Item' : 'Add to Inventory'}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData(initialFormState); }} style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* READ: INVENTORY TABLE */}
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#333', color: 'white' }}>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Make</th>
            <th style={{ padding: '10px' }}>Model</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {motorcycles.map((moto) => (
            <tr key={moto.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{moto.id}</td>
              <td style={{ padding: '10px' }}>{moto.make}</td>
              <td style={{ padding: '10px' }}>{moto.model}</td>
              <td style={{ padding: '10px' }}>${moto.price}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleEdit(moto)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(moto.id)} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#dc3545', color: 'white', border: 'none' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}