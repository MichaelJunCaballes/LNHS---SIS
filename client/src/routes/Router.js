import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../middlewares/ProtectedRoute';
// import { AuthProvider } from '../middlewares/authContext';

/****Layouts*****/
// const FullLayout = lazy(() => import('../layouts/full layouts/FullLayout.js'));
const AdminLayout = lazy(() => import('../layouts/full layouts/admin.js'));
const RegistrarLayout = lazy(() => import('../layouts/full layouts/registrar.js'));
const TeacherLayout = lazy(() => import('../layouts/full layouts/teacher.js'));

/***** Pages ****/
const Login = lazy(() => import('../views/Login.js'));

// Dashboards
const Admin = lazy(() => import('../views/dashboards/adminDash.js'));
const Registrar = lazy(() => import('../views/dashboards/registrarDash.js'));
const Teacher = lazy(() => import('../views/dashboards/teacherDash.js'));

// Components
const Students = lazy(() => import('../components/tables/students list/students.js'));
const AccountsAdmin = lazy(() => import('../components/tables/user accounts/admin.js'));
const AccountsRegistrar = lazy(() => import('../components/tables/user accounts/registrar.js'));
const UserProfile = lazy(() => import('../components/user profile/profile.js'));

// Templates and Elements
// const Starter = lazy(() => import('../views/ui/Starter.js'));
const About = lazy(() => import('../views/ui/About.js'));
// const Alerts = lazy(() => import('../views/ui/Alerts'));
// const Badges = lazy(() => import('../views/ui/Badges'));
// const Buttons = lazy(() => import('../views/ui/Buttons'));
// const Cards = lazy(() => import('../views/ui/Cards'));
// const Grid = lazy(() => import('../views/ui/Grid'));
// const Tables = lazy(() => import('../views/ui/Tables'));
// const Forms = lazy(() => import('../views/ui/Forms'));
// const Breadcrumbs = lazy(() => import('../views/ui/Breadcrumbs'));

const ThemeRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {/* Admin Routes */}
        <Route path="user/admin/" element={<AdminLayout />}>
          <Route path="dashboard" element={<Admin />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="accounts" element={<AccountsAdmin />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Registrar Routes */}
        <Route path="user/registrar/" element={<RegistrarLayout />}>
          <Route path="dashboard" element={<Registrar />} />
          <Route path="students" element={<Students />} />
          <Route path="TOR" element={<About />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="accounts" element={<AccountsRegistrar />} />
          <Route path="about" element={<About />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="user/teacher/" element={<TeacherLayout />}>
          <Route path="dashboard" element={<Teacher />} />
          <Route path="students" element={<Students />} />
          <Route path="grading" element={<About />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>
    </Routes>
  </Suspense>
);

export default ThemeRoutes;