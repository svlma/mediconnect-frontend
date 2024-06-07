import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import Loading from '../components/Loader/Loading';
import Error from '../components/Error/Error';

const UserForm = () => {
  const { id } = useParams();
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'patient',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${BASE_URL}/admin/users/${id}`);
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          setUser(data.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/users${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      navigate('/admin/users');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} User</h2>
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <select name="role" value={user.role} onChange={handleChange}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit">{id ? 'Update' : 'Add'} User</button>
        </form>
      )}
    </div>
  );
};

export default UserForm;
