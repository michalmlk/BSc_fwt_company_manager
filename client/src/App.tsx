import React from 'react';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';
import Dashboard from './components/pages/Dashboard/Dashboard';
import EmployeePage from './components/pages/EmployeePage/EmployeePage';
import MachineParkPage from './components/pages/MachineParkPage/MachineParkPage';
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
    const queryClient = new QueryClient();

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainTemplate />}>
                <Route index element={<Navigate to="/home" />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="employees" element={<EmployeePage />} />
                <Route path="trucks" element={<MachineParkPage />} />
                <Route path="reports" element={<h1>Hello reports</h1>} />
                <Route path="settings" element={<h1>Welcome settings</h1>} />
                {/*error page*/}
                <Route path='*' element={<ErrorPage />} />
            </Route>
        )
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen />
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
};

export default App;
