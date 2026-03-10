import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import School from './pages/School';
import Classes from './pages/Classes';
import TestSeries from './pages/TestSeries';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="school" element={<School />} />
        <Route path="classes" element={<Classes />} />
        <Route path="test-series" element={<TestSeries />} />
      </Route>
    </Routes>
  );
}
