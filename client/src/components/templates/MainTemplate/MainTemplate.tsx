import React from 'react';
import Navbar from '../../shared/Navbar/Navbar';
import { PageWrapper } from './MainTemplate.styles';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

const MainTemplate: React.FC = () => {
    return (
        <>
            <PageWrapper>
                <ToastContainer />
                <Navbar />
                <Outlet />
            </PageWrapper>
        </>
    );
};

export default MainTemplate;
