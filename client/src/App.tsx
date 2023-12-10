import React from 'react';
import MainTemplate from './components/templates/MainTemplate/MainTemplate';
import EmployeePage from './components/pages/EmployeePage/EmployeePage';
import MachineParkPage from './components/pages/MachineParkPage/MachineParkPage';
import DeliveriesPage from './components/pages/DeliveriesPage/DeliveriesPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { trucksLoader } from './loaders/trucksLoader';
import 'react-toastify/dist/ReactToastify.css';
import { deliveriesLoader } from './loaders/deliveriesLoader';
import LoginPage from './components/pages/LoginPage/LoginPage';
import { ProtectedRoute } from './components/templates/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import AuthProvider from './context/AuthContext';

const App: React.FC = () => {
    const queryClient = new QueryClient();
    const { token } = useAuth();

    const routesForUnauthorizedUser = [
        {
            path: '/',
            element: <div>Test home page</div>,
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
    ];

    const routesForAuthenticatedUsers = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/home',
                    element: <DeliveriesPage />,
                    loader: deliveriesLoader(queryClient),
                },
                {
                    path: '/employees',
                    element: <EmployeePage />,
                },
                {
                    path: '/trucks',
                    element: <MachineParkPage />,
                    loader: trucksLoader(queryClient),
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },
    ];

    const router = createBrowserRouter(
        [...(!token ? routesForUnauthorizedUser : []), ...routesForAuthenticatedUsers]
        // createRoutesFromElements(
        //     <Route path="/" element={<MainTemplate />}>
        //         <Route path="login" element={<LoginPage />} />
        //         <Route index element={<Navigate to="/home" />} />
        //         <Route path="home" element={<DeliveriesPage />} loader={deliveriesLoader(queryClient)} />
        //         <Route path="employees" element={<EmployeePage />} />
        //         <Route path="trucks" element={<MachineParkPage />} loader={trucksLoader(queryClient)} />
        //         <Route path="settings" element={<h1>Welcome settings</h1>} />
        //         <Route path="*" element={<ErrorPage />} />
        //     </Route>
        // )
    );

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient} contextSharing={false}>
                <ReactQueryDevtools initialIsOpen />
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default App;
