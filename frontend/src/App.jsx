import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Home from './pages/Home';
import School from './pages/School';
import Classes from './pages/Classes';
import TestSeries from './pages/TestSeries';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="school" element={<School />} />
        <Route path="classes" element={<Classes />} />
        <Route path="test-series" element={<TestSeries />} />
      </Route>
    </Routes>
  );
}
