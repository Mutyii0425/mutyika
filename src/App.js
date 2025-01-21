// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './kezdolap';
import Oterm from './oterm';
import SignUp from './signup';
import SignIn from './sign';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Kezdőlap */}
        <Route path="/oterm" element={<Oterm />} /> {/* Összes Termék */}
        <Route path="/signup" element={<SignUp />} />{/* singup oldal */}
        <Route path="/sign" element={<SignIn />} />{/* singup oldal */}
      </Routes>
    </Router>
  );
};

export default App;
