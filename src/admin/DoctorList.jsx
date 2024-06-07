import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import Loading from '../components/Loader/Loading';
import ErrorComponent from '../components/Error/Error';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin/doctors`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message);
        }
        const data = await res.json();
        setDoctors(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) {
      return;
    }

    console.log(`Attempting to delete doctor with id: ${id}`);
    try {
      const res = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }
      setDoctors(doctors.filter(doctor => doctor._id !== id));
      console.log(`Successfully deleted doctor with id: ${id}`);
    } catch (err) {
      console.error("Failed to delete doctor:", err.message);
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-doctor/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Doctors</h2>
      {loading && <Loading />}
      {error && <ErrorComponent errMessage={error} />}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Specialization</th>
                <th className="py-2 px-4">Average Rating</th>
                <th className="py-2 px-4">Total Rating</th>
                <th className="py-2 px-4">Approved</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map(doctor => (
                <tr key={doctor._id} className="border-b">
                  <td className="py-2 px-4">{doctor.name}</td>
                  <td className="py-2 px-4">{doctor.email}</td>
                  <td className="py-2 px-4">{doctor.specialization}</td>
                  <td className="py-2 px-4">{doctor.averageRating}</td>
                  <td className="py-2 px-4">{doctor.totalRating}</td>
                  <td className="py-2 px-4">{doctor.isApproved}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-2"
                      onClick={() => handleEdit(doctor._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorList;
