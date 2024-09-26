import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Pomodoro from './components/Pomodoro';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
  return (
    <Router className="app min-h-screen bg-gray-100 m-4">
      <div>
        <Header />
        <Routes>
          <Route path="/todo" element={<TodoList />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
          <Route path="/" element={<TodoList />} />{' '}
          {/* Ana sayfa olarak TodoList'i kullan */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
