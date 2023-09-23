import React from 'react';
import { PageWrapper } from './ErrorTemplate.styles';
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

const ErrorTemplate: React.FC = () => {

    const navigate = useNavigate();
    return (
        <PageWrapper>
            <div className="flex flex-column gap-2">
                <h1>
                    <i className="pi pi-exclamation-triangle" />
                    {' '}No matching route!
                </h1>
                <p>Please make sure that your url is correct.</p>
                <Button icon="pi pi-caret-left" label="Back" onClick={() => navigate('/home')} />
            </div>
        </PageWrapper>
    );
};

export default ErrorTemplate;
