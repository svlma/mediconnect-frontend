
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import Loading from '../components/Loader/Loading';
import Error from '../components/Error/Error';

const DoctorForm = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({
    name: '',
    email: '',
    specialization: '',
    qualifications: [],
    experiences: [],
    bio: '',
    about: '',
    ticketPrice: '',
    phone: '',
    timeSlots: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchDoctor = async () => {
        try {
          const res = await fetch(`${BASE_URL}/admin/doctors/${id}`);
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message);
          }
          setDoctor(data.data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchDoctor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'qualifications' || name === 'experiences' || name === 'timeSlots') {
      setDoctor({
        ...doctor,
        [name]: value.split(',').map((item) => item.trim()),
      });
    } else {
      setDoctor({
        ...doctor,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/doctors${id ? `/${id}` : ''}`, {
        method: id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doctor),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      navigate('/admin/doctors');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit' : 'Add'} Doctor</h2>
      {loading && <Loading />}
      {error && <Error errMessage={error} />}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
          />
          <input
            type="text"
            name="qualifications"
            value={doctor.qualifications.join(', ')}
            onChange={handleChange}
            placeholder="Qualifications (comma separated)"
            required
          />
          <input
            type="text"
            name="experiences"
            value={doctor.experiences.join(', ')}
            onChange={handleChange}
            placeholder="Experiences (comma separated)"
            required
          />
          <input
            type="text"
            name="bio"
            value={doctor.bio}
            onChange={handleChange}
            placeholder="Bio"
            required
          />
          <textarea
            name="about"
            value={doctor.about}
            onChange={handleChange}
            placeholder="About"
            required
          />
          <input
            type="number"
            name="ticketPrice"
            value={doctor.ticketPrice}
            onChange={handleChange}
            placeholder="Ticket Price"
            required
          />
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="timeSlots"
            value={doctor.timeSlots.join(', ')}
            onChange={handleChange}
            placeholder="Time Slots (comma separated)"
            required
          />
          <button type="submit">{id ? 'Update' : 'Add'} Doctor</button>
        </form>
      )}
    </div>
  );
};

export default DoctorForm;
