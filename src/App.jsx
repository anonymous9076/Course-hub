import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <>
      <BrowserRouter>
      <PrimeReactProvider>

          <ScrollToTop></ScrollToTop>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:category" element={<Courses />} />
            <Route path="/upload-resources" element={<Upload />} />
            <Route path="/question-paper" element={<Paper />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification" element={<OtpVerificaiton />} />
        </Routes>
      </PrimeReactProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
