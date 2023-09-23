import React from 'react';
import { PageWrapper } from './ErrorPage.styles';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <PageWrapper>
            <div className="flex flex-column w-4 gap-2">
                <h1>
                    <i className="pi pi-exclamation-triangle" /> Page not found 😕
                </h1>
                <p>It seems like we couldn't find requested page. Please make sure that your url is correct.</p>
                <Button icon="pi pi-caret-left" label="Back" onClick={() => navigate('/home')} />
            </div>
        </PageWrapper>
    );
};

export default ErrorPage;
