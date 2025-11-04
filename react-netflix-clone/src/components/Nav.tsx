import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Nav.css';

export default function Nav() {
  const [show, handleShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav ${show && 'nav_black'}`}>
      <img
        alt="Netflix logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        className="nav_logo"
        onClick={() => window.location.reload()}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav_input"
        type="text"
        placeholder="영화를 검색해주세요."
      />
      <img
        alt="User logged"
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png?20201013161117"
        className="nav_avatar"
      />
    </nav>
  );
}
