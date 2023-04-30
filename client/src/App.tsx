import React from 'react';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from "./components/pages/Dashboard/Dashboard";
import MachinePark from "./components/pages/MachinePark/MachinePark";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <MainTemplate>
                <Routes>
                    <Route path="/deliveries" element={<Dashboard />} />
                    <Route path="/employees" element={<h1>Hello employees</h1>} />
                    <Route path="/trucks" element={<MachinePark />} />
                    <Route path="/reports" element={<h1>Hello reports</h1>} />
                    <Route path="/settings" element={<h1>Welcome settings</h1>} />
                </Routes>
            </MainTemplate>
        </BrowserRouter>
    );
}

export default App;
