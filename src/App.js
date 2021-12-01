import { Route, Routes } from 'react-router-dom';
import Navigation from 'componrnts/Navigation';
import HomePage from 'views/HomePage/HomePage';
import Movies from 'views/Movies';

import './App.css';
import ErrorView from 'views/ErrorView';

function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route element={<ErrorView />} />
      </Routes>
    </>
  );
}

export default App;
