// App.jsx
import React from 'react';

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SensorLayout from "./pages/SensorLayout";
import SensorMonitoring from "./pages/SensorMonitoring";
import Login from "./pages/LoginPage";
import Signup from "./pages/SigninPage";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import NSBLayout from "./components/NoSideLayout";
import DesignProofChecks from "./pages/DesignProofChecks";
import SHM from "./pages/StrHealthMon";
import NDE from "./pages/NonDesEval";
import LoadTesting from "./pages/LoadTesting";
import TDS from "./pages/Test";
// import test2 from "./pages/Test2";
import RealTimeData from "./components/RealTimeData";
import Project from "./pages/Project";
import General from "./pages/General";
import ContactPage from "./pages/Contact";

const App = () => {
  return (

    <Routes>
      {/* Login route without layout */}

      <Route path="/login" element={<Login />} />
      <Route path="/signin" element={<Signup/>}/>
      <Route path="/test" element={<TDS/>}/>
      {/* <Route path="/test2" element={<test2/>}/> */}
      <Route path="/password-reset-request" element={<ResetPassword/>}/>
      <Route path="/realtime-data" element={<RealTimeData/>}/>
      {/* Routes using the Layout */}
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<HomePage />} /> */}

        <Route path="/" element={<HomePage />}/>
        <Route path="sensor-layout" element={<SensorLayout />} />
        <Route path="sensor-monitoring" element={<SensorMonitoring />} />
        <Route path="design-proof-check" element={<DesignProofChecks/>}/>
        <Route path="structural-health-monitoring" element={<SHM/>}/>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="non-destructive-evaluation" element={<NDE/>}/>
        <Route path="load-testing" element={<LoadTesting />} />
        <Route path="project" element={<Project />} />
        <Route path="general" element={<General />} />
        <Route path="contact" element={<ContactPage/>}/>

      </Route>
    </Routes>
  );
};

export default App;
