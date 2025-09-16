// frontend/src/pages/UserForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      const fetchUser = async () => {
        try {
          const res = await API.get(`/users/${id}`);
          setName(res.data.name);
          setEmail(res.data.email);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      };
      fetchUser();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await API.put(`/users/${id}`, { name, email });
      } else {
        await API.post('/users', { name, email });
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>{isEdit ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
