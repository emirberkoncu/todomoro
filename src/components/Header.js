import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header mb-4">
      <h1 className="text-center text-3xl font-bold text-gray-700">Todomoro</h1>
      <nav className="text-center mt-2">
        <Link
          to="/todo"
          className="text-blue-500 hover:text-orange-300 hover:underline mr-4"
        >
          Todo
        </Link>
        <Link
          to="/pomodoro"
          className="text-blue-500 hover:text-orange-300 hover:underline"
        >
          Pomodoro Timer
        </Link>
      </nav>
    </header>
  );
};

export default Header;
