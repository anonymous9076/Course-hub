import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./auth/Login";
import Layout from "./Layout";
import Courses from "./Pages/Courses";
import Register from "./auth/register";
import OtpVerificaiton from "./auth/OtpVerificaiton";
import Upload from "./Pages/Upload";
import Paper from "./Pages/Paper";
import Saved from "./Pages/Saved";
import Contact from "./Pages/Contact";
import ScrollToTop from "./components/ScrollToTop";
import { PrimeReactProvider } from 'primereact/api';
import ViewCourse from "./Pages/ViewCourse";
import ViewPaper from "./Pages/ViewPaper";
import ProtectedRoute from "./auth/ProtectedRoute";
import Landing from "./Pages/Landing";

function App() {
  const token = localStorage.getItem('token');

  return (
    <>
      <BrowserRouter>
        <PrimeReactProvider>

          <ScrollToTop></ScrollToTop>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={token ? <Navigate to="/home" /> : <Landing />} />
            <Route path="/login" element={token ? <Navigate to="/home" /> : <Login />} />
            <Route path="/register" element={token ? <Navigate to="/home" /> : <Register />} />
            <Route path="/otp-verification" element={<OtpVerificaiton />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:category" element={<Courses />} />
                <Route path="/upload-resources" element={<Upload />} />
                <Route path="/question-paper" element={<Paper />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/course/:id" element={<ViewCourse />} />
                <Route path="/question-paper/:id" element={<ViewPaper />} />
              </Route>
            </Route>

            {/* Default fallback */}
            <Route path="*" element={<Navigate to={token ? "/home" : "/"} />} />
          </Routes>
        </PrimeReactProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
