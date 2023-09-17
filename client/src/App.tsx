import React from 'react';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard/Dashboard';
import EmployeePage from './components/pages/EmployeePage/EmployeePage';
import MachineParkPage from './components/pages/MachineParkPage/MachineParkPage';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen />
            <BrowserRouter>
                <ToastContainer />
                <MainTemplate>
                    <Routes>
                        <Route path="/deliveries" element={<Dashboard />} />
                        <Route path="/employees" element={<EmployeePage />} />
                        <Route path="/trucks" element={<MachineParkPage />} />
                        <Route path="/reports" element={<h1>Hello reports</h1>} />
                        <Route path="/settings" element={<h1>Welcome settings</h1>} />
                    </Routes>
                </MainTemplate>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;
