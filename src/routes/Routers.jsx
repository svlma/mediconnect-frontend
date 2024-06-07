import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Doctors from "../pages/Doctors/Doctors";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/doctor-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import AdminDashboard from "../admin/AdminDashboard";
import UserList from "../admin/UserList";
import DoctorList from "../admin/DoctorList";
import EditUserForm from "../admin/EditUserForm";
import EditDoctorForm from "../admin/EditDoctorForm";
import LocationSearch from "../pages/Doctors/LocationSearch";
import VideoCall from "../pages/VideoCall";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/location-search" element={<LocationSearch />} />{" "}
      <Route path="/video-call/:roomId" element={<VideoCall />} />
      {/* Ajout de cette ligne */}
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DoctorList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-doctors"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DoctorList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-user/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EditUserForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/edit-doctor/:id"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <EditDoctorForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
