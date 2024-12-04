import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <Layout>{children}</Layout> : <Navigate to="/login" />;
}

function App() {
  const [courses, setCourses] = useState<any[]>([]);

  // Fetch courses data from the backend when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/courses')  // Your backend API URL
      .then((response) => {
        setCourses(response.data);  // Set the response data to state
      })
      .catch((error) => {
        console.error('There was an error fetching the courses!', error);
      });
  }, []);  // Empty dependency array ensures this runs once on component mount

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard courses={courses} />  {/* Passing courses as a prop */}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
