import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Snackbars } from './components/BasicComponents';
import { useState, useEffect } from 'react';
import ProtectedRoute from './utils/utils';

function App() {
  const [openSnack, setOpenSnack] = useState(false);
  const [snackData, setSnackData] = useState(null);
  let access_token = localStorage.getItem("access_token") 

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  return (
    <BrowserRouter>
      {openSnack ? (
        <Snackbars open={openSnack} setOpen={handleCloseSnack} data={snackData} />
      ) : null}
      <Nav setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
          </ProtectedRoute>
          } />
        <Route path="/dashboard" element={
      <ProtectedRoute>
      <Dashboard setOpenSnack={setOpenSnack} setSnackData={setSnackData} />
    </ProtectedRoute>
          } />
        <Route path="/login" element={<Login setOpenSnack={setOpenSnack} setSnackData={setSnackData} />} />
        <Route path="/signup" element={<Signup setOpenSnack={setOpenSnack} setSnackData={setSnackData} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
