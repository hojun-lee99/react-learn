import Nav from './components/Nav';
import './App.css';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';

function Layout() {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route index element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
