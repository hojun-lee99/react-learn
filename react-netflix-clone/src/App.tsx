import Nav from './components/Nav';
import './App.css';
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';
import DeatilPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

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
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path=":movieId" element={<DeatilPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
