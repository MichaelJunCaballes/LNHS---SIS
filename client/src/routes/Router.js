import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../middlewares/ProtectedRoute.js";
import { AuthProvider } from '../middlewares/authContext';

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/full layouts/FullLayout.js"));
const AdminLayout = lazy(() => import("../layouts/full layouts/admin.js"));
const RegistrarLayout = lazy(() => import("../layouts/full layouts/registrar.js"));
const TeacherLayout = lazy(() => import("../layouts/full layouts/teacher.js"));

/***** Pages ****/
// Landing Page
const Login = lazy(() => import("../views/Login.js"));

// Dashboards
const Admin = lazy(() => import("../views/dashboards/adminDash.js"));
const Registrar = lazy(() => import("../views/dashboards/registrarDash.js"));
const Teacher = lazy(() => import("../views/dashboards/teacherDash.js"));
git
// Components
const Students = lazy(() => import("../components/tables/students list/students.js")); // Student List (active, inactive, alumni)
const AccountsAdmin = lazy(() => import("../components/tables/user accounts/admin.js")); // Admin User Accounts - Teachers and Registrars
const AccountsRegistrar = lazy(() => import("../components/tables/user accounts/registrar.js")); // Registrar User Accounts - only Teachers
const UserProfile = lazy(() => import("../components/user profile/profile.js")); // User Profile Design all users

// Templates and Elements
const Starter = lazy(() => import("../views/ui/Starter.js"));
const About = lazy(() => import("../views/ui/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "/", element: <Navigate to="/admin/dashboard" /> },
      { path: "/admin/dashboard", exact: true, element: <Admin /> },
      { path: "/admin/profile", exact: true, element: <UserProfile /> },
      { path: "/admin/accounts", exact: true, element: <AccountsAdmin /> },
      { path: "/admin/about", exact: true, element: <About /> },
    ],
  },
  {
    path: "/",
    element: <RegistrarLayout />,
    children: [
      { path: "/", element: <Navigate to="/registrar/dashboard" /> },
      { path: "/registrar/dashboard", exact: true, element: <Registrar /> },
      { path: "/registrar/students", exact: true, element: <Students /> },
      { path: "/registrar/TOR", exact: true, element: <About /> },
      { path: "/registrar/profile", exact: true, element: <UserProfile /> },
      { path: "/registrar/accounts", exact: true, element: <AccountsRegistrar /> },
      { path: "/registrar/about", exact: true, element: <About /> },
    ],
  },
  {
    path: "/",
    element: <TeacherLayout />,
    children: [
      { path: "/", element: <Navigate to="/teacher/dashboard" /> },
      { path: "/teacher/dashboard", exact: true, element: <Teacher /> },
      { path: "/teacher/students", exact: true, element: <Students /> },
      { path: "/teacher/grading", exact: true, element: <About /> },
      { path: "/teacher/profile", exact: true, element: <UserProfile /> },
      { path: "/teacher/about", exact: true, element: <About /> },
    ],
  },
];

const RoutesWithAuth = () => (
  <AuthProvider>
    {ThemeRoutes.map((route, index) => {
      if (route.path === '/') {
        return (
          <Routes key={index} path={route.path} element={route.element} />
        );
      } else {
        return (
          <ProtectedRoute key={index} path={route.path} element={route.element} />
        );
      }
    })}
  </AuthProvider>
);

export default RoutesWithAuth;
