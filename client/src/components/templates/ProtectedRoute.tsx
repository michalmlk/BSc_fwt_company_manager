import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MainTemplate from './MainTemplate/MainTemplate';

export const ProtectedRoute: React.FC = (): ReactElement => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return <MainTemplate />;
};
